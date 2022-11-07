import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import style from './user-operation.module.scss';
import type { NextPage } from 'next';
import { IUserOperationProps } from './user-operation.ineterface';
import UserForClient from '../../../business/user/user-for-client';
import useTranslation, { DefaultTranslationEnum } from '../../../tools/translation';

/**
 * user operation component
 * @param {Object} [props] user operation options
 * @param {Object} [props.userBaseInfo] The base info of local user.
 * @param {Function} [props.onSignOut] The callback of user sign out.
 * @constructor
 */
const UserOperation: NextPage<IUserOperationProps, Component> = (props) => {
  const { userBaseInfo, onSignOut } = props;
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    UserForClient.removeUserBaseInfoFromLocal();
    onSignOut && onSignOut();
  };

  return (
    <Box className={style['user-operation']}>
      <Avatar
        onClick={handleClick}
        {...UserForClient.getUserAvatarConfig(userBaseInfo)}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          { t('signOut') }
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserOperation;
