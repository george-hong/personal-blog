import React, { Component, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { requestToLogin } from '../../../tools/clientRequest/modules/user';
import Form, { FormItem, FormItemType, IFormMethods, TriggerType } from '../form/form';
import style from './login-dialog.module.scss';
import type { NextPage } from 'next';
import { ILoginParams } from '../../../interface/user.interface';
import Secret from '../../../tools/secret';
import { SecretType } from '../../../interface/tool.interface';

interface ILoginDialogProps {
  visible: boolean;
  onClose: () => unknown;
}

const getRegisterFormConfig = (): Array<FormItem> => {
  return [
    {
      type: FormItemType.Input,
      key: 'name',
      label: '用户名',
      value: '',
      rules: [
        {
          required: true,
          message: '请填写用户名',
        },
      ],
      grid: {
        xs: 12,
      },
      trigger: [TriggerType.onBlur],
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: '密码',
      value: '',
      inputType: 'password',
      rules: [
        {
          required: true,
          message: '请填写密码',
        },
      ],
      grid: {
        xs: 12,
      },
    },
  ]
};

/**
 * login dialog component
 * @param {Object} [props] component options
 * @param {string} [props.visible] Dialog visibility.
 * @param {function} [props.onClose] The function to close dialog.
 * @constructor
 */
const LoginDialog: NextPage<ILoginDialogProps, Component> = (props) => {
  const { visible, onClose } = props;
  const [formConfig, setFormConfig] = useState(getRegisterFormConfig());
  const formRef = useRef<IFormMethods>();
  const router = useRouter();
  const { asPath } = router;
  const registerPath = `/register?back=${asPath}`;

  const startToLogin = () => {
    formRef.current?.validate<ILoginParams>()
      .then((values) => {
        // Encode login info.
        values.password = Secret.encode(values.password, { type: SecretType.sha256 });
        return requestToLogin(values);
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        const { message, field } = error;
        if (message && field) {
          formRef.current?.setValidation({
            [field]: {
              error: true,
              message,
            }
          });
        }
        // Form error.
      });
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
    >
      <Box
        className={style['login-dialog']}
        sx={{ padding: 3 }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Typography component="span">
              登录
            </Typography>
          </Grid>
          <Grid
            className="content-to-right"
            item
            xs={6}
          >
            <IconButton
              color="primary"
              aria-label="close"
              component="label"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
        <Form
          config={formConfig}
          ref={formRef}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          onClick={startToLogin}
        >
          登录
        </Button>
        <Link href={registerPath}>
          <a>
            <Typography
              component="span"
              sx={{ fontSize: 12, color: 'primary.main' }}
            >
              前往注册
            </Typography>
          </a>
        </Link>

      </Box>
    </Dialog>
  );
};

export default LoginDialog;
