import { ForwardedRef } from 'react';

export enum NoticeType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export interface INoticeProps {
  ref: ForwardedRef<INoticeMethods | null>
}

export interface INoticeOptions {
  type: NoticeType;
}

export interface INoticeMethods {
  notice: (message: string, options?: Partial<INoticeOptions>) => void;
}
