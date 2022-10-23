import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import style from './user-operation.module.scss';
import type { NextPage } from 'next';
import { IUserOperationProps } from './user-operation.ineterface';

/**
 * user operation component
 * @param {Object} [props] user operation options
 * @param {Object} [props.userBaseInfo] The base info of local user.
 * @constructor
 */
const UserOperation: NextPage<IUserOperationProps, Component> = (props) => {
  const { userBaseInfo } = props;

  return (
    <Box className={style['user-operation']}>
      <Avatar>{ userBaseInfo.nickName }</Avatar>
    </Box>
  );
};

export default UserOperation;
