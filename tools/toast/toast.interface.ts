export enum ToastType {
  info = 'info', success = 'success', warning = 'warning', error = 'error',
}

export interface IToastOptions {
  type: ToastType;
}
