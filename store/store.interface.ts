import { ReactNode } from 'react';
import { Dispatch } from 'redux';
import { StoreUserField } from '../interface/store.interface';
import { IUserBaseInfo } from '../interface/request-response/user.interface';

export interface IStoreProps {
  children?: ReactNode;
}

export const enum StoreModuleEnum {
  USER = 'user',
}

export const enum UserActionEnum {
  SET = 'SET',
}

// action
export interface IAction<M, T, D> {
  module: M;
  type: T;
  data: D;
}

export interface IUserAction extends IAction<
  StoreModuleEnum.USER,
  UserActionEnum.SET,
  IUserBaseInfo | null
  >{}

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
