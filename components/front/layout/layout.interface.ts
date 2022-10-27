import { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  footer?: ReactNode | null | true;
  notContainer?: boolean;
  autoHideHeader?: boolean;
  onHeaderVisibilityChange?: (visibility: boolean) => void;
}
