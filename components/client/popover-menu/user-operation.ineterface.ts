import { ReactNode } from 'react';

export interface IUserOperationProps {
  children: ReactNode;
  menus: {
    [key: string]: {
      content: ReactNode,
      onClick?: (event: unknown) => void;
    }
  };
}
