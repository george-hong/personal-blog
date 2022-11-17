import React, {
  ReactNode,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Layout from '../../components/client/layout';
import Notice from '../../components/client/notice';
import Form from '../../components/client/form';
import {
  requestToCheckExistence,
  requestToGetRSAPublicKey,
  requestToSignUp,
} from '../../tools/request/modules/user';
import { getSignUpPageData } from './assets';
import User from '../../business/user/user';
import style from './index.module.scss';
import type { NextPage } from 'next';
import {
  ExistenceCheckType,
  ISignUpParams,
} from '../../interface/request-response/user.interface';
import {
  FormItem,
  FormItemType,
  IFormMethods,
  TriggerType,
} from '../../components/client/form/form.interface';
import {
  INoticeMethods,
  NoticeType,
} from '../../components/client/notice/notice.interface';
import { IPageBaseData } from '../../interface/request-response/base.interface';
import {
  ISignUpPageData,
  SignUpLocaleEnum,
} from './sign-up.interface';
import { getParamsObjFromURL } from '../../libs/url-utils';
import useTranslation from '../../tools/translation';
import type { ITranslation } from '../../tools/translation';
import {
  KeyEvent,
  KeyEnum,
} from '../../tools/class/event';
import {
  ErrorEnum,
  ISystemError,
} from '../../interface/base.interface';

const getSignUpFormConfig = (t: ITranslation): Array<FormItem> => {
  return [
    {
      type: FormItemType.Input,
      key: 'account',
      label: t('Account'),
      value: '',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('please input account'),
        },
        {
          minLength: 5,
          message: t('account needs 5 charts at least'),
        },
        {
          custom(account, values, resolve, reject) {
            if (!account) return resolve();
            const requestParams = { field: ExistenceCheckType.account, value: account as string };
            requestToCheckExistence(requestParams)
              .then(result => {
                if (result.data.existence) {
                  reject(t('user name repeated'));
                } else resolve();
              })
              .catch(error => {
                reject(t('network error, input again.'));
              });
          },
        },
      ],
      trigger: [TriggerType.onBlur],
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: t('Password'),
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('please input password again'),
        },
        {
          minLength: 8,
          message: t('password needs 8 charts at least'),
        },
        {
          maxLength: 30,
          message: t('password should not long than 30 charts'),
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'passwordRepeat',
      label: t('Repetitive Password'),
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('please repetitive password again'),
        },
        {
          custom: (value, values, resolve, reject) => {
            if (value === values.password) resolve();
            else reject();
          },
          message: t('two passwords not match'),
        },
      ]
    },
    {
      type: FormItemType.Input,
      key: 'nickName',
      label: t('Nick Name'),
      value: '',
      inputType: 'text',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('please input nick name'),
        },
        {
          minLength: 2,
          message: t('nick name needs 2 charts at least'),
        },
        {
          maxLength: 20,
          message: t('nick name should not long than 20 charts'),
        },
        {
          custom(nickName, values, resolve, reject) {
            if (!nickName) return resolve();
            const requestParams = { field: ExistenceCheckType.nickName, value: nickName as string };
            requestToCheckExistence(requestParams)
              .then(result => {
                if (result.data.existence) {
                  reject(t('nick name already exists'));
                } else resolve();
              })
              .catch(error => {
                reject(t('Network Error, Please try again.'));
              });
          },
        }
      ],
      trigger: [TriggerType.onBlur],
    },
  ]
};

const SignUpPage: NextPage<IPageBaseData<ISignUpPageData>, ReactNode> = (props) => {
  const { meta, error } = props;
  const { t } = useTranslation(SignUpLocaleEnum.SignUp);
  const noticeRef = useRef<INoticeMethods>(null);
  const [publicKey, setPublicKey] = useState<string>('');
  const formRef = useRef<IFormMethods>();
  const router = useRouter();
  const formConfig = getSignUpFormConfig(t);
  let urlParams;
  let backUrl: string;
  try {
    urlParams = getParamsObjFromURL(router.asPath);
  } catch (error) {
    urlParams = {};
  }
  if (urlParams.back) backUrl = urlParams.back;

  const showNotice = (message: string, type?: NoticeType) => {
    noticeRef.current?.notice(message, { type });
  };

  const startToSignUp = (backUrl?: string) => {
    let signUpParams: ISignUpParams;
    formRef.current?.validate<ISignUpParams>()
      .then((values) => {
        signUpParams = values;
        if (publicKey) return Promise.resolve({ data: { content: publicKey } });
        else return requestToGetRSAPublicKey();
      })
      .then(publicKeyInfo => {
        const publicKey = publicKeyInfo.data.content;
        const user = new User(signUpParams);
        setPublicKey(publicKey);
        user.encodeAndSetPassword(signUpParams.password, publicKey);
        return requestToSignUp(user.generateSignUpParams());
      })
      .then(() => {
        showNotice(t('Sign up success! Redirect later.'), NoticeType.success);
        backUrl && setTimeout(() => {
          router.push(backUrl);
        }, 2000);
      })
      .catch((error: ISystemError) => {
        let message: string | undefined;
        if (error && error.type === ErrorEnum.formValidation) {
          // Does not need to show notice, because the form had done this.
          // message = t('please try again after modified');
        } else {
          message = t('Network Error');
        }
        message && showNotice(message, NoticeType.error);
      });
  };

  return (
    <Layout
      meta={meta}
      error={error}
      contentClassName={style['sign-up']}
    >
      <Box
        sx={{ pt: 2, pb: 2 }}
        onKeyDown={KeyEvent.getKeyListener<HTMLDivElement>(KeyEnum.Enter, () => startToSignUp(backUrl))}
      >
        <Form
          config={formConfig}
          ref={formRef}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          onClick={() => startToSignUp(backUrl)}
        >
          { t('sign up') }
        </Button>
      </Box>
      <Notice ref={noticeRef} />
    </Layout>
  )
};

export const getServerSideProps = getSignUpPageData;

export default SignUpPage;
