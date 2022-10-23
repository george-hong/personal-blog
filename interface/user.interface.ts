import { IResponseBase } from './base.interface';

export enum ExistenceCheckType {
  account = 'account',
  nickName = 'nickName',
}

export interface IExistenceVerificationParams {
  field: ExistenceCheckType;
  value: string;
}

export interface ISignUpParams {
  account: string;
  password: string;
}

export interface ILoginParams {
  account: string;
  password: string;
}

export interface ILoginQueryResult {
  id: number;
  password: string;
  privateKey: string;
  nickName: string;
  avatar?: string;
}

export interface IUserBaseInfo {
  id: number;
  nickName: string;
  avatar?: string;
}

export interface IEditArticleResponse extends IResponseBase {
  data: {
    id: number;
  };
}

export interface IGetPublicKeyResponse extends IResponseBase {
  data: {
    content: string;
  };
}

export interface IRegisterResponse extends IResponseBase {
  data: {
    existence: boolean;
  }
}

export interface ILoginResponse extends IResponseBase {
  data: {
    token: string;
  }
}
