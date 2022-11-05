import React, {
  Fragment,
  Component,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Box from '@mui/material/Box';
import toast, { Toaster } from 'react-hot-toast';
import type { NextPage } from 'next';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import style from './notice.module.scss';
import {
  INoticeMethods,
  INoticeOptions,
  INoticeProps,
  NoticeType,
} from './notice.interface';

const NOTICE_TYPE_AND_OPTIONS_MAPPING = {
  [NoticeType.info]: {
    className: '',
    icon: <InfoRoundedIcon fontSize="small" />,
  },
  [NoticeType.success]: {
    className: style['notice-success'],
    icon: <CheckCircleRoundedIcon fontSize="small" />,
  },
  [NoticeType.warning]: {
    className: style['notice-warning'],
    icon: <ErrorRoundedIcon fontSize="small" />,
  },
  [NoticeType.error]: {
    className: style['notice-error'],
    icon: <CancelRoundedIcon fontSize="small" />,
  },
}

const DEFAULT_NOTICE_OPTIONS = {
  type: NoticeType.info,
}

/**
 * notice component
 * @param {Object} props component options
 */
const Notice: NextPage<INoticeProps, Component> = forwardRef<INoticeMethods, INoticeProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    notice(message: string, options?: Partial<INoticeOptions>) {
      const realOptions = Object.assign({}, DEFAULT_NOTICE_OPTIONS, options) as INoticeOptions;
      const { type }= realOptions;
      const currentTypeOptions = NOTICE_TYPE_AND_OPTIONS_MAPPING[type];
      const noticeNode = (
        <Fragment>
          <Box sx={{ mr: 1, display: 'flex' }}>
            { currentTypeOptions.icon }
          </Box>
          { message }
        </Fragment>
      )
      toast(noticeNode, {
        duration: 3000,
        position: 'top-center',
        className: `${style.notice} ${currentTypeOptions.className}`,
      });
    }
  }));

  return <Toaster position="top-center" />
});

Notice.displayName = 'Notice';

export default Notice;
