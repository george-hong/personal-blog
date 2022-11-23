import React, { Component, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
  requestToGetRSAPublicKey,
  requestToSignIn,
} from '../../../tools/request/modules/user';
import Form from '../form';
import Secret, {
  SecretType,
} from '../../../tools/secret';
import UserForClient from '../../../business/user/user-for-client';
import useTranslation, { DefaultTranslationEnum } from '../../../tools/translation';
import { KeyEvent, KeyEnum } from '../../../tools/class/event';
import type { ITranslation } from '../../../tools/translation';
import style from './sign-in-dialog.module.scss';
import type { NextPage } from 'next';
import { ISignInParams } from '../../../interface/request-response/user.interface';
import {
  FormItem,
  FormItemType,
  IFormMethods,
  TriggerType,
} from '../form/form.interface';
import { ISignInDialogProps } from './sign-in-dialog.interface';

const getSignUpFormConfig = (t: ITranslation): Array<FormItem> => {
  return [
    {
      type: FormItemType.Input,
      key: 'account',
      label: t('Account'),
      value: '',
      rules: [
        {
          required: true,
          message: t('please input account'),
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
      label: t('Password'),
      value: '',
      inputType: 'password',
      rules: [
        {
          required: true,
          message: t('please input password'),
        },
      ],
      grid: {
        xs: 12,
      },
    },
  ]
};

/**
 * sign in dialog component
 * @param {object} [props] component options
 * @param {string} [props.visible] Dialog visibility.
 * @param {function} [props.onClose] The function to close dialog.
 * @constructor
 */
const SignInDialog: NextPage<ISignInDialogProps, Component> = (props) => {
  const { visible, onClose, onSignIn } = props;
  const router = useRouter();
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const [publicKey, setPublicKey] = useState<string>('');
  const formRef = useRef<IFormMethods>();
  // Fix: FormConfig will not use newest language when use 'useState'.
  const formConfig = getSignUpFormConfig(t);
  const { asPath } = router;
  const signUpPath = `/sign-up?back=${asPath}`;

  const startToSignIn = () => {
    let signInParams: ISignInParams;
    formRef.current?.validate<ISignInParams>()
      .then((values) => {
        // Record sign in parameters.
        signInParams = values;
        if (publicKey) return Promise.resolve({ data: { content: publicKey } });
        return requestToGetRSAPublicKey();
      })
      .then(publicKeyInfo => {
        // Encode sign in info.
        const key = publicKeyInfo.data.content;
        setPublicKey(key);
        signInParams.password = Secret.encode(signInParams.password, { type: SecretType.SHA256 });
        signInParams.password = Secret.encode(
          signInParams.password,
          {
            type: SecretType.RSA,
            key,
          }
        );
        return requestToSignIn(signInParams);
      })
      .then(result => {
        const user = new UserForClient({ account: signInParams.account });
        user.saveSignInInfoToLocal(result);
        // Close sign in dialog.
        onClose();
        onSignIn && onSignIn(result.data);
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
        } else throw(error);
        // Form error.
      });
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
    >
      <Box
        className={style['sign-in-dialog']}
        sx={{ padding: 3 }}
        onKeyUp={KeyEvent.getKeyListener<HTMLDivElement>(KeyEnum.Enter, startToSignIn)}
      >
        <Grid container>
          <Grid item xs={6}>
            <Typography component="span">
              { t('sign in') }
            </Typography>
          </Grid>
          <Grid
            className="content-horizontal-right"
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
          onClick={startToSignIn}
        >
          { t('sign in') }
        </Button>
        <Link href={signUpPath}>
          <Typography
            component="span"
            sx={{ fontSize: 12, color: 'primary.main' }}
          >
            { t('go to sign up') }
          </Typography>
        </Link>
      </Box>
    </Dialog>
  );
};

export default SignInDialog;
