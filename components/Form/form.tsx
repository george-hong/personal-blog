import React, { Component, ReactNode, useState } from 'react';
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
}

const messageDefaultValue = ' ';
const getValueInfo = (formChangedObject: FormConfigChangedObject, key: string): IValueInfo => {
  return formChangedObject[key].valueInfo;
};
const setValueInfo = (
  formChangedObject: FormConfigChangedObject,
  setFormChangedObject: ISetFormConfigChangedObject,
  key: string,
  newValueInfo: Partial<IValueInfo>
): void => {
  const valueInfo = formChangedObject[key].valueInfo;
  formChangedObject[key].valueInfo = {
    ...valueInfo,
    ...newValueInfo,
  };
  // We use new form object instead of old, Because react didn't update when use same object reference.
  setFormChangedObject({ ...formChangedObject });
};
const validate = (
  formChangedObject: FormConfigChangedObject,
  setFormChangedObject: ISetFormConfigChangedObject,
  key: string
): void => {
  const formChangedItem = formChangedObject[key];
  const { rules, valueInfo: { value } } = formChangedItem;
  if (rules) {
    const validationResult = { error: false, message: messageDefaultValue };
    rules.some(rule => {
      if (rule.required && value === '') {
        validationResult.error = true;
        validationResult.message = rule.message ?? messageDefaultValue;
      }
    });
    setValueInfo(formChangedObject, setFormChangedObject, key, validationResult);
  }
}
const generateFormItemByType = (key: string, formChangedObject: FormConfigChangedObject, setFormChangedObject: ISetFormConfigChangedObject) => {
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
          setValueInfo(formChangedObject, setFormChangedObject, key, { value: event.target.value });
          validate(formChangedObject, setFormChangedObject, key);
        }}
        onFocus={() => {
          setValueInfo(formChangedObject, setFormChangedObject, key, { error: false, message: ' ' });
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
const Form: NextPage<IFormProps, Component> = (props) => {
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
};

export default Form;
