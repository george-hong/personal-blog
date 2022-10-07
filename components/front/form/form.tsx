import React, { Component, ReactNode, useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import cloneDeep from 'lodash.clonedeep';
import type { NextPage } from 'next';

export enum FormItemType {
 Input = 'input'
}
export enum TriggerType {
  onChange = 'onChange',
  onFocus = 'onFocus',
  onBlur = 'onBlur',
}
type GridValue = 'auto' | number | boolean;
type ValueType = string | number | boolean;
type ChangeHandler = (event?: React.ChangeEvent<HTMLInputElement>) => void;
type FocusHandler = (event?: React.FocusEvent) => void;
type BlurHandler = (event?: Event) => void;
type EventType = React.ChangeEvent<HTMLInputElement> | FocusEvent | Event;
interface IEvents {
  [TriggerType.onChange]: Array<ChangeHandler>;
  [TriggerType.onFocus]: Array<FocusHandler>;
  [TriggerType.onBlur]: Array<BlurHandler>;
}
interface IEventHandler<T> {
  (event?: T): void;
}
interface IValues {
  [key: string]: ValueType;
}
interface IRule {
  message?: string;
  required?: boolean;
  custom?: (currentValue: ValueType, values: IValues, resolve: () => void, reject: (customMessage?: string) => void) => void;
}
interface IFormItemCommon {
  type: FormItemType;
  label: string;
  key: string;
  rules?: Array<IRule>;
  grid?: {
    xl?: GridValue;
    lg?: GridValue;
    md?: GridValue;
    sm?: GridValue;
    xs?: GridValue;
  };
  trigger?: Array<TriggerType>;
}
interface IInputForm extends IFormItemCommon {
  value: string;
}
interface IValueInfo {
  value: ValueType;
  error: boolean;
  message: string;
}
interface IFormItemChanged {
  valueInfo: IValueInfo;
}
export type FormItem = IInputForm;
type FormItemChanged = IInputForm & IFormItemChanged;
interface FormConfigChangedObject {
  [key: string]: FormItemChanged;
}
interface ISetFormConfigChangedObject {
  (formChangedObject: FormConfigChangedObject): void;
}
interface IFormProps {
  config: Array<FormItem>;
  className?: string;
  ref?: ForwardedRef<any>;
}
export interface IFormMethods {
  validate: (keys?: Array<string>) => Promise<void>;
  clearValidation: (keys?: Array<string>) => void;
  getValues: (keys?: Array<string>) => IValues;
}

const messageDefaultValue = ' ';
const getValues = (formChangedObject: FormConfigChangedObject, keys?: Array<string>) => {
  const validationKeys = keys ? keys : Object.keys(formChangedObject);
  return validationKeys.reduce((result, key) => {
  result[key] = formChangedObject[key].valueInfo.value;
  return result;
}, {} as IValues);
}
const validate = (
  key: string,
  formChangedObject: FormConfigChangedObject,
  setFormChangedObject?: ISetFormConfigChangedObject,
): Promise<ValueType> => {
  return new Promise((resolve, reject) => {
    const formChangedItem = formChangedObject[key];
    const { rules, valueInfo: { value } } = formChangedItem;
    const validationResult = { error: false, message: messageDefaultValue };
    const promiseList: Array<Promise<void>> = [];
    if (rules) {
      rules.forEach(rule => {
        promiseList.push(
          new Promise<void>((innerResolve: () => void, innerReject) => {
            if (rule.required && value === '') {
              innerReject(rule.message);
            } else if (rule.custom) {
              rule.custom(value, getValues(formChangedObject), innerResolve, (customMessage?: string) => {
                innerReject(customMessage ?? rule.message);
              });
            } else {
              innerResolve();
            }
          })
        );
      });
    }
    Promise.all(promiseList)
      .then(() => {
        resolve(value);
      })
      .catch((errorMessage) => {
        validationResult.error = true;
        errorMessage && (validationResult.message = errorMessage);
        reject();
      })
      .finally(() => {
        setValueInfo(formChangedObject, key, validationResult, setFormChangedObject);
      });
  });
}
const setValueInfo = (
  formChangedObject: FormConfigChangedObject,
  key: string,
  newValueInfo: Partial<IValueInfo>,
  setFormChangedObject?: ISetFormConfigChangedObject,
): void => {
  const valueInfo = formChangedObject[key].valueInfo;
  formChangedObject[key].valueInfo = {
    ...valueInfo,
    ...newValueInfo,
  };
  // We use new form object instead of old, Because react didn't update when use same object reference.
  setFormChangedObject && setFormChangedObject({ ...formChangedObject });
};
const generateFormItemByType = (
  key: string,
  formChangedObject: FormConfigChangedObject,
  setFormChangedObject: ISetFormConfigChangedObject
) => {
  const formConfigItemChanged = formChangedObject[key];
  const {
    type,
    grid,
    rules,
    valueInfo,
    label,
    trigger = ['onChange'],
  } = formConfigItemChanged;
  const events: IEvents = {
    onChange: [
      (event) => {
        setValueInfo(formChangedObject, key, { value: event?.target.value }, setFormChangedObject);
      },
    ],
    onFocus: [
      () => {
        setValueInfo(formChangedObject, key, { error: false, message: ' ' }, setFormChangedObject);
      }
    ],
    onBlur: [],
  };
  if (trigger) {
    const validation = () => {
      validate(key, formChangedObject, setFormChangedObject).catch(() => {});
    };
    trigger.forEach(type => {
      if (events[type] && !events[type].includes(validation)) events[type].push(validation);
    });
  }
  const eventsObject: { [key: string]: IEventHandler<EventType> } = {};
  Object.entries(events).forEach((typeAndEvents: [string, Array<IEventHandler<EventType>>]) => {
    const [type, events] = typeAndEvents;
    eventsObject[type] = function(event) {
      events.forEach(handler => handler.call(this, event));
    };
  });
  const required = rules && rules.some(rule => rule.required === true);
  let formContent: ReactNode;
  if (type === 'input') {
    formContent = (
      <TextField
        key={key}
        required={required}
        label={label}
        value={valueInfo.value}
        error={valueInfo.error}
        helperText={valueInfo.message}
        variant="standard"
        fullWidth
        {...eventsObject}
      />
    )
  }

  return (
    <Grid
      item
      key={key}
      {...grid}
    >
      { formContent }
    </Grid>
  )
}

/**
 * form component
 * @param {string} [className] - Class name of form container.
 * @param {Object[]} config - Form config.
 * @param {string} config[].type - Field type. e.g. input、select.
 * @param {string} config[].key - Field unique key.
 * @param {string} config[].label - Field name.
 * @param {string} config[].value - Field default value.
 * @param {string[]} config[].trigger - Timing of Field validation triggered, excepted 'onChange'、'onBlur'、'OnFocus'.
 * @param {Object} [config[].grid] - Field layout.
 * @param {number} [config[].grid.xs] - Field layout at size xs.
 * @param {number} [config[].grid.sm] - Field layout at size sm.
 * @param {number} [config[].grid.lg] - Field layout at size lg.
 * @param {number} [config[].grid.xl] - Field layout at size xl.
 * @param {Object[]} config[].rules - Form validation rules.
 * @param {string} [config[].rules[].message] - Tooltip for validation fail.
 * @param {boolean} [config[].rules[].required] - Field is required.
 * @param {function} [config[].rules[].custom] - Custom validation for field.
 * @constructor
 */
const Form: NextPage<IFormProps, Component> = forwardRef<IFormMethods, IFormProps>((props, ref) => {
  const { className, config } = props;
  const configObject: FormConfigChangedObject = {};
  cloneDeep(config).forEach(formItem => {
    configObject[formItem.key] = {
      ...formItem,
      valueInfo: {
        value: formItem.value,
        error: false,
        message: ' ',
      }
    }
  });
  const [formChangedObject, setFormChangedObject] = useState<FormConfigChangedObject>(configObject);

  useImperativeHandle(ref, () => ({
    validate: (keys?) => {
      return new Promise((resolve, reject) => {
        const validationKeys = keys ? keys : Object.keys(configObject);
        const maxIndex = validationKeys.length - 1;
        const keysOfError: Array<string> = [];
        const promiseList: Array<Promise<void>> = [];
        validationKeys.forEach((key, index) => {
          const changingStateOrUndefined = index === maxIndex ? setFormChangedObject : undefined;
          promiseList.push(
            validate(key, formChangedObject, changingStateOrUndefined)
              .then(() => {})
              .catch((message) => {
                keysOfError.push(key);
                throw new Error(message)
              })
          )
        });
        Promise.all(promiseList)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject(keysOfError);
          })
      });
    },
    clearValidation: (keys?) => {
      const validationKeys = keys ? keys : Object.keys(configObject);
      const maxIndex = validationKeys.length - 1;
      validationKeys.forEach((key, index) => {
        const changingStateOrUndefined = index === maxIndex ? setFormChangedObject : undefined;
        setValueInfo(formChangedObject, key, { error: false, message: messageDefaultValue }, changingStateOrUndefined);
      });
    },
    getValues: (keys?) => {
      return getValues(formChangedObject, keys);
    }
  }));

  return (
    <Grid
      className={className}
      container
    >
      {
        config.map(formConfig => {
          const { key } = formConfig;
          return generateFormItemByType(key, formChangedObject, setFormChangedObject);
        })
      }
    </Grid>
  );
});

Form.displayName = 'Form';

export default Form;
