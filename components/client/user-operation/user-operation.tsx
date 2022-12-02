import React, { Fragment, FC } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PopoverMenu from '../popover-menu';
import style from './user-operation.module.scss';
import UserForClient from '../../../business/user/user-for-client';
import useTranslation, { DefaultTranslationEnum } from '../../../tools/translation';
import {
  connectStore,
  IWithStore,
  StoreModuleEnum,
} from '../../../store';
import { IUserOperationProps } from './user-operation.ineterface';

/**
 * user operation component
 * @param {Object} [props] user operation options
 * @param {Object} [props.userBaseInfo] The base info of local user.
 * @param {Function} [props.onSignOut] The callback of user sign out.
 * @constructor
 */
const UserOperation: FC<IUserOperationProps & IWithStore> = (props) => {
  const { userBaseInfo, onSignOut } = props;
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const route = useRouter();
  const goToPersonalCenter = () => {
    route.push(`/user/${userBaseInfo.id}`);
  };
  const signOut = () => {
    UserForClient.removeUserInfoFromLocal();
    onSignOut && onSignOut();
  };
  const menus = {
    personalCenter: {
      content: (
        <Fragment>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          { t('personal center') }
        </Fragment>
      ),
      onClick: goToPersonalCenter,
    },
    signOut: {
      content: (
        <Fragment>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          { t('sign out') }
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

export default connectStore([StoreModuleEnum.USER])(UserOperation);
