import { ForwardedRef } from 'react';
import { IUserBaseInfo } from '../../../../interface/request-response/user.interface';
import { StoreUserField } from '../../../../interface/store.interface';
import { IStoreApp } from '../../../../store';

export interface IHeaderRefProps extends IStoreApp {
  visibility?: boolean;
  onSignIn?: (userBaseInfo: IUserBaseInfo) => void;
  onSignOut?: () => void;
  user: StoreUserField;
  ref: ForwardedRef<HTMLHeadElement>;
}

export interface IHeaderProps {
  autoHide?: boolean;
  onSignIn?: (userBaseInfo: IUserBaseInfo) => void;
  onSignOut?: () => void;
  onVisibilityChange?: (visibility: boolean) => void;
}

export interface IHeaderStore extends IStoreApp {
  user: StoreUserField;
}
