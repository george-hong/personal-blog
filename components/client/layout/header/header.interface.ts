import { ForwardedRef } from 'react';
import { IUserBaseInfo } from '../../../../interface/request-response/user.interface';

export interface IHeaderRefProps {
  visibility?: boolean;
  onLogin?: (userBaseInfo: IUserBaseInfo) => void;
  onLogout?: () => void;
  ref: ForwardedRef<HTMLHeadElement>;
}

export interface IHeaderProps {
  autoHide?: boolean;
  onLogin?: (userBaseInfo: IUserBaseInfo) => void;
  onLogout?: () => void;
  onVisibilityChange?: (visibility: boolean) => void;
}

export enum HeaderLocaleEnum {
  Header = 'header',
}
