import React, { Component, ReactNode, useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import cloneDeep from 'lodash.clonedeep';
import type { NextPage } from 'next';

export enum FormItemType {
 Input = 'input'
}
type GridValue = 'auto' | number | boolean;
interface RuleBase {
  message?: string;
}
interface RequireRule extends RuleBase {
  required?: boolean;
}
interface IFormItemCommon {
  type: FormItemType;
  label: string;
  key: string;
  rules?: Array<RequireRule>;
  grid?: {
    xl?: GridValue;
    lg?: GridValue;
    md?: GridValue;
    sm?: GridValue;
    xs?: GridValue;
  };
}
interface IInputForm extends IFormItemCommon {
  value: string;
}
interface IValueInfo {
  value: string | number | boolean;
  error: boolean;
  message: string;
}
interface IFormItemChanged {
  valueInfo: IValueInfo;
}
type FormItem = IInputForm;
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
  validate: (keys?: Array<string>) => null | Array<string>;
  clearValidation: (keys?: Array<string>) => void;
}

const messageDefaultValue = ' ';
const validate = (
  key: string,
  formChangedObject: FormConfigChangedObject,
  setFormChangedObject?: ISetFormConfigChangedObject,
): boolean => {
  const formChangedItem = formChangedObject[key];
  const { rules, valueInfo: { value } } = formChangedItem;
  const validationResult = { error: false, message: messageDefaultValue };
  if (rules) {
    rules.some(rule => {
      if (rule.required && value === '') {
        validationResult.error = true;
        validationResult.message = rule.message ?? messageDefaultValue;
      }
    });
    setValueInfo(formChangedObject, key, validationResult, setFormChangedObject);
  }
  return validationResult.error;
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
  } = formConfigItemChanged;
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
        onChange={(event) => {
          setValueInfo(formChangedObject, key, { value: event.target.value }, setFormChangedObject);
          validate(key, formChangedObject, setFormChangedObject);
        }}
        onFocus={() => {
          setValueInfo(formChangedObject, key, { error: false, message: ' ' }, setFormChangedObject);
        }}
        onBlur={() => {
          validate(key, formChangedObject, setFormChangedObject);
        }}
        variant="standard"
        fullWidth
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
      const validationKeys = keys ? keys : Object.keys(configObject);
      const maxIndex = validationKeys.length - 1;
      const keysOfError: Array<string> = [];
      validationKeys.forEach((key, index) => {
        const changingStateOrUndefined = index === maxIndex ? setFormChangedObject : undefined;
        if (validate(key, formChangedObject, changingStateOrUndefined)) keysOfError.push(key);
      });
      return keysOfError.length ? keysOfError : null;
    },
    clearValidation: (keys?) => {
      const validationKeys = keys ? keys : Object.keys(configObject);
      const maxIndex = validationKeys.length - 1;
      validationKeys.forEach((key, index) => {
        const changingStateOrUndefined = index === maxIndex ? setFormChangedObject : undefined;
        setValueInfo(formChangedObject, key, { error: false, message: messageDefaultValue }, changingStateOrUndefined);
      });
    },
  }))
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

export default Form;
