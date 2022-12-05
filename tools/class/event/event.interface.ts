import { IUniformObject } from '../../../interface/base.interface';

export enum KeyEnum {
  Enter = 'Enter',
}

export interface IHandler {
  (event: unknown): void;
}

export interface IHandlerRecorder {
  [key: string]: Array<IHandler>;
}

export interface IObject extends IUniformObject<unknown> {}
