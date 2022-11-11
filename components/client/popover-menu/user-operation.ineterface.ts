import { ReactNode } from 'react';

export interface IMenus {
  [key: string]: {
    content: ReactNode,
    onClick?: (event: unknown) => void;
  }
}

export interface IUserPopoverMenuProps {
  children: ReactNode;
  menus: IMenus;
  className?: string;
}
