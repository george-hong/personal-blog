import { IResponseBase } from './base.interface';

export interface IExistenceVerificationParams {
  name: string;
}

export interface ISignUpParams {
  name: string;
  password: string;
}

export interface ILoginParams {
  name: string;
  password: string;
}

export interface ILoginQueryResult {
  password: string;
}

export interface IEditArticleResponse extends IResponseBase {
  data: {
    id: number;
  };
}

export interface IRegisterResponse extends IResponseBase {
  data: {
    existence: boolean;
  }
}
