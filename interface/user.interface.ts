import { IResponseBase } from './base.interface';

export interface IExistenceVerificationParams {
  account: string;
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
