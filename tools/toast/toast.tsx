import { Fragment } from 'react';
import Box from '@mui/material/Box';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import {
  IToastOptions,
  ToastType,
} from './toast.interface';
import style from './toast.module.scss';
import { toast as toastOrigin } from 'react-hot-toast';

const NOTICE_TYPE_AND_OPTIONS_MAPPING = {
  [ToastType.info]: {
    className: '',
    icon: <InfoRoundedIcon fontSize="small" />,
  },
  [ToastType.success]: {
    className: style['notice-success'],
    icon: <CheckCircleRoundedIcon fontSize="small" />,
  },
  [ToastType.warning]: {
    className: style['notice-warning'],
    icon: <ErrorRoundedIcon fontSize="small" />,
  },
  [ToastType.error]: {
    className: style['notice-error'],
    icon: <CancelRoundedIcon fontSize="small" />,
  },
}

const DEFAULT_NOTICE_OPTIONS = {
  type: ToastType.info,
}

const toast = (message: string, options?: Partial<IToastOptions>) => {
  const realOptions = Object.assign({}, DEFAULT_NOTICE_OPTIONS, options) as IToastOptions;
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
  toastOrigin(noticeNode, {
    duration: 3000,
    position: 'top-center',
    className: `${style.notice} ${currentTypeOptions.className}`,
  });
}

export default toast;
