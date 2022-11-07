import { ForwardedRef } from 'react';
import { IUserBaseInfo } from '../../../../interface/request-response/user.interface';

export interface IHeaderRefProps {
  visibility?: boolean;
  onSignIn?: (userBaseInfo: IUserBaseInfo) => void;
  onSignOut?: () => void;
  ref: ForwardedRef<HTMLHeadElement>;
}

export interface IHeaderProps {
  autoHide?: boolean;
  onSignIn?: (userBaseInfo: IUserBaseInfo) => void;
  onSignOut?: () => void;
  onVisibilityChange?: (visibility: boolean) => void;
}
