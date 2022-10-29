import { ReactNode } from 'react';

export interface IMetaProps {
  children: ReactNode;
  title?: string;
  keywords?: string;
  description?: string;
  metaInfo?: ReactNode;
}
