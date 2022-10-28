import { IUniformObject } from '../../../interface/base.interface';
import { ForwardedRef } from 'react';

export enum FormItemType {
  Input = 'input'
}

export enum TriggerType {
  onChange = 'onChange', onFocus = 'onFocus', onBlur = 'onBlur',
}

type GridValue =
  'auto'
  | number
  | boolean;
export type ValueType =
  string
  | number
  | boolean;
type ChangeHandler = (event?: React.ChangeEvent<HTMLInputElement>) => void;
type FocusHandler = (event?: React.FocusEvent) => void;
type BlurHandler = (event?: Event) => void;
export type EventType =
  React.ChangeEvent<HTMLInputElement>
  | FocusEvent
  | Event;

export interface IEvents {
  [TriggerType.onChange]: Array<ChangeHandler>;
  [TriggerType.onFocus]: Array<FocusHandler>;
  [TriggerType.onBlur]: Array<BlurHandler>;
}

export interface IEventHandler<T> {
  (event?: T): void;
}

export interface IValues {
  [key: string | number]: ValueType;
}

interface IRule {
  message?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  custom?: (currentValue: ValueType, values: IValues, resolve: () => void, reject: (customMessage?: string) => void) => void;
}

interface IFormItemCommon {
  type: FormItemType;
  label: string;
  key: string;
  inputType?: string;
  rules?: Array<IRule>;
  grid?: {
    xl?: GridValue; lg?: GridValue; md?: GridValue; sm?: GridValue; xs?: GridValue;
  };
  trigger?: Array<TriggerType>;
  autoComplete?: string;
}

interface IInputForm extends IFormItemCommon {
  value: string;
}

interface IValueErrorInfo {
  error: boolean;
  message: string;
}

export interface IValueInfo extends IValueErrorInfo {
  value: ValueType;
}

interface IFormItemChanged {
  valueInfo: IValueInfo;
}

export type FormItem = IInputForm;
type FormItemChanged =
  IInputForm
  & IFormItemChanged;

export interface FormConfigChangedObject {
  [key: string]: FormItemChanged;
}

export interface ISetFormConfigChangedObject {
  (formChangedObject: FormConfigChangedObject): void;
}

export interface IFormProps {
  config: Array<FormItem>;
  className?: string;
  ref?: ForwardedRef<any>;
}

export interface IFormMethods {
  validate: <T>(keys?: Array<string>) => Promise<T>;
  clearValidation: (keys?: Array<string>) => void;
  setValidation: (keyAndValidationMapping: IUniformObject<IValueErrorInfo>) => void;
  getValues: <T>(keys?: Array<string>) => T;
}
