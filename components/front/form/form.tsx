import React, { Component, forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import cloneDeep from 'lodash.clonedeep';
import type { NextPage } from 'next';
import {
  EventType,
  FormConfigChangedObject,
  IEventHandler,
  IEvents,
  IFormMethods,
  IFormProps,
  ISetFormConfigChangedObject,
  IValueInfo,
  IValues,
  TriggerType,
  ValueType,
} from './form.interface';

const messageDefaultValue = ' ';
const getValues = (formChangedObject: FormConfigChangedObject, keys?: Array<string>): unknown => {
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
      const isRequired = !!rules.find(rule => rule.required === true);
      rules.forEach(rule => {
        promiseList.push(
          new Promise<void>((innerResolve: () => void, innerReject) => {
            if (rule.required && value === '') {
              innerReject(rule.message);
            } else if (rule.custom) {
              rule.custom(value, getValues(formChangedObject) as IValues, innerResolve, (customMessage?: string) => {
                innerReject(customMessage ?? rule.message);
              });
            } else if (
              typeof(value) === 'string' &&
              rule.minLength &&
              value.length < rule.minLength &&
              !(!isRequired && value.length === 0)
            ) {
              innerReject(rule.message);
            } else if (
              typeof(value) === 'string' &&
              rule.maxLength &&
              value.length > rule.maxLength &&
              !(!isRequired && value.length === 0)
            ) {
              innerReject(rule.message);
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
    trigger = [TriggerType.onChange, TriggerType.onBlur],
    autoComplete,
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
    const { inputType = 'text' } = formConfigItemChanged;
    formContent = (
      <TextField
        key={key}
        required={required}
        label={label}
        value={valueInfo.value}
        error={valueInfo.error}
        helperText={valueInfo.message}
        variant="standard"
        type={inputType}
        fullWidth
        autoComplete={autoComplete}
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
 * @param {string} [config[].inputType = 'text'] - Input type.
 * @param {string[]} [config[].trigger[] = ['onChange', 'onBlur']] - Timing of Field validation triggered, excepted 'onChange'、'onBlur'、'OnFocus'.
 * @param {Object} [config[].grid] - Field layout.
 * @param {number} [config[].grid.xs] - Field layout at size xs.
 * @param {number} [config[].grid.sm] - Field layout at size sm.
 * @param {number} [config[].grid.lg] - Field layout at size lg.
 * @param {number} [config[].grid.xl] - Field layout at size xl.
 * @param {Object[]} config[].rules - Form validation rules.
 * @param {string} [config[].rules[].message] - Tooltip for validation fail.
 * @param {boolean} [config[].rules[].required] - Field is required.
 * @param {function} [config[].rules[].custom] - Custom validation for field.
 * @param {string} [config[].autoComplete] - Field autocomplete property.
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
    validate: <T,>(keys?: Array<string>) => {
      return new Promise<T>((resolve, reject) => {
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
            resolve(getValues(formChangedObject, keys) as T);
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
    setValidation: (keyAndValidationMapping) => {
      const keyAndValidationList = Object.entries(keyAndValidationMapping);
      const maxIndex = keyAndValidationList.length - 1;
      keyAndValidationList.forEach((keyAndValidation, index) => {
        const [key, validation] = keyAndValidation;
        const changingStateOrUndefined = index === maxIndex ? setFormChangedObject : undefined;
        setValueInfo(formChangedObject, key, { error: validation.error, message: validation.message }, changingStateOrUndefined);
      });
    },
    getValues: <T,>(keys?: Array<string>): T => {
      return getValues(formChangedObject, keys) as T;
    },
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
