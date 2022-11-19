import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { IUniformObject } from '../base.interface';

export interface IResponseBase {
  status: number;
}

export interface IRequestWithLocale {
  locale?: string;
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  userFromToken?: {
    id: number;
  }
}

export interface IUserFromToken {
  id: number;
}

export interface ExtendedNextApiResponse extends NextApiResponse {
  userFromToken?: IUserFromToken;
  supply: (response: unknown) => void;
  throw: (messageOrProps?: string | IUniformObject<string>, code?: number) => void;
}

export interface IPageBaseData<T> {
  meta: {
    title: string;
    keywords?: string;
    description?: string;
  };
  pageData?: T;
  error?: unknown;
}

export interface IPageBaseDataBeforeSend<T> {
  props: IPageBaseData<T>
}
