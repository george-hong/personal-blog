import { ReactNode } from 'react';

export interface IStoreProps {
  children?: ReactNode;
}

export const enum UserActionEnum {
  ClEAR = 'CLEAR',
  SET = 'SET',
}
