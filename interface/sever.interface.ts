import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { IUniformObject } from './base.interface';

export interface ExtendedNextApiRequest extends NextApiRequest {
  userFromToken?: {
    id: number;
  }
}

export interface ExtendedNextApiResponse extends NextApiResponse {
  supply: (response: unknown) => void;
  throw: (messageOrProps?: string | IUniformObject<string>, code?: number) => void;
}
