import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { IUniformObject } from '../base.interface';

export interface IResponseBase {
  status: number;
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  userFromToken?: {
    id: number;
  }
}

export interface ExtendedNextApiResponse extends NextApiResponse {
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
}

export interface IPageBaseDataBeforeSend<T> {
  props: IPageBaseData<T>
}
