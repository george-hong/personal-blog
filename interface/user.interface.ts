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
