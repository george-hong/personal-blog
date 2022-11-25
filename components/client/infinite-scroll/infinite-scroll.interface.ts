import { ReactNode } from 'react';

export interface IInfiniteScrollProps {
  next: () => void;
  hasMore: boolean;
  dataLength: number;
  children: ReactNode;
  loader?: ReactNode | string ;
  endMessage?: ReactNode | string;
}
