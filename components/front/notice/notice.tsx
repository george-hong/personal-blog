import React, { Component } from 'react';
import SnackBar from '@mui/material/SnackBar';
import Alert from '@mui/material/Alert';
import type { NextPage } from 'next';

export enum NoticeType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}
interface INoticeProps {
  visible: boolean;
  onClose: () => unknown;
  message: string;
  type?: NoticeType;
}

/**
 * content empty layout component
 * @param {Object} props component options
 * @param {boolean} props.visible Notice visibility.
 * @param {function} props.onClose Method of close notice.
 * @param {string} props.message Message of notice.
 * @param {string} props.type Type of notice.
 * @constructor
 */
const Notice: NextPage<INoticeProps, Component> = (props) => {
  const {
    visible,
    onClose,
    message,
    type = NoticeType.info,
  } = props;

  return (
    <SnackBar
      open={visible}
      onClose={onClose}
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </SnackBar>
  );
};

export default Notice;
