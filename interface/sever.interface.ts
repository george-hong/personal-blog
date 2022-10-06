import { NextApiResponse } from 'next';

export interface ExtendedNextApiResponse extends NextApiResponse {
  supply: (response: unknown) => void;
  throw: (message?: string, code?: number) => void;
}
