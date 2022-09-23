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
interface IFormItemChanged {
  valueInfo: {
    value: string | number | boolean;
    error: boolean;
    message: string;
  }
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

const generateFormItemByType = (key: string, formChangedObject: FormConfigChangedObject, setFormChangedObject: ISetFormConfigChangedObject) => {
  const formConfigChanged = formChangedObject[key];
  const {
    type,
    grid,
    rules,
    valueInfo,
    label,
  } = formConfigChanged;
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
          setFormChangedObject({
            ...formChangedObject,
            [key]: {
              ...formConfigChanged,
              valueInfo: {
                value: event.target.value,
                error: false,
                message: ' ',
              }
            }
          })
        }}
        variant="standard"
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
