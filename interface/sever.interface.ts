import { NextApiResponse } from 'next';
import { IUniformObject } from './base.interface';

export interface ExtendedNextApiResponse extends NextApiResponse {
  supply: (response: unknown) => void;
  throw: (messageOrProps?: string | IUniformObject<string>, code?: number) => void;
}
