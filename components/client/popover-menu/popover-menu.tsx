import React, { Component, Fragment } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { NextPage } from 'next';
import { IUserPopoverMenuProps } from './popover-menu';

/**
 * popover menu component
 * @param {Object} [props] user operation options
 * @param {ReactNode} [props.children] The content always show.
 * @param {Object} [props.menus] The config of menus.
 * @param {string} [props.className] The class name of container.
 */
const PopoverMenu: NextPage<IUserPopoverMenuProps, Component> = (props) => {
  const { className, children, menus } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div
        className={className}
        onClick={handleClick}>
        { children }
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          menus && Object.entries(menus).map(keyAndMenu => {
            const [key, menu] = keyAndMenu;
            return (
              <MenuItem
                onClick={menu.onClick}
                key={key}
              >
                { menu.content }
              </MenuItem>
            );
          })
        }
      </Menu>
    </Fragment>
  );
};

export default PopoverMenu;
