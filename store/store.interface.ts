import { ReactNode } from 'react';
import { Dispatch } from 'redux';
import { StoreUserField } from '../interface/store.interface';

export interface IStoreProps {
  children?: ReactNode;
}

export interface IAction<T> {
  type: string;
  module: StoreModuleEnum;
  data: T;
}

export const enum StoreModuleEnum {
  USER = 'user',
}

export const enum UserActionEnum {
  ClEAR = 'CLEAR',
  SET = 'SET',
}

export interface IStoreState {
  user?: StoreUserField;
}

export interface IStoreApp {
  dispatch: Dispatch;
}

export interface IMapDispatch {
  dispatch: Dispatch;
}

export interface IWithStore extends IMapDispatch {
  store: Partial<IStoreState>;
}
