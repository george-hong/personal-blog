import React, { Component, Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PopoverMenu from '../popover-menu';
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
  const signOut = () => {
    UserForClient.removeUserBaseInfoFromLocal();
    onSignOut && onSignOut();
  };
  const menus = {
    signOut: {
      content: (
        <Fragment>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          { t('signOut') }
        </Fragment>
      ),
      onClick: signOut
    }
  }

  return (
    <PopoverMenu
      className={style['user-operation']}
      menus={menus}>
      <Avatar
        {...UserForClient.getUserAvatarConfig(userBaseInfo)}
      />
    </PopoverMenu>
  );
};

export default UserOperation;
