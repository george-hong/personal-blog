import React, {
  ReactNode,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Layout from '../../components/client/layout';
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
import toast, { ToastType } from '../../tools/toast';

const getSignUpFormConfig = (t: ITranslation): Array<FormItem> => {
  return [
    {
      type: FormItemType.Input,
      key: 'account',
      label: t('账号'),
      value: '',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('请填写账号'),
        },
        {
          minLength: 5,
          message: t('账号需要至少5个字符'),
        },
        {
          maxLength: 15,
          message: t('账号最长为15个字符'),
        },
        {
          custom(account, values, resolve, reject) {
            if (!account) return resolve();
            const requestParams = { field: ExistenceCheckType.account, value: account as string };
            requestToCheckExistence(requestParams)
              .then(result => {
                if (result.data.existence) {
                  reject(t('用户名重复'));
                } else resolve();
              })
              .catch(error => {
                reject(t('网络异常，请再次输入'));
              });
          },
        },
      ],
      trigger: [TriggerType.onBlur],
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: t('密码'),
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('请填写密码'),
        },
        {
          minLength: 8,
          message: t('密码需要至少8个字符'),
        },
        {
          maxLength: 30,
          message: t('密码最长为30个字符'),
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'passwordRepeat',
      label: t('重复密码'),
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('请再次填写密码'),
        },
        {
          custom: (value, values, resolve, reject) => {
            if (value === values.password) resolve();
            else reject();
          },
          message: t('两次密码输入不一致'),
        },
      ]
    },
    {
      type: FormItemType.Input,
      key: 'nickName',
      label: t('昵称'),
      value: '',
      inputType: 'text',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('请填写昵称'),
        },
        {
          minLength: 2,
          message: t('昵称需要至少2个字符'),
        },
        {
          maxLength: 20,
          message: t('昵称最长为20个字符'),
        },
        {
          custom(nickName, values, resolve, reject) {
            if (!nickName) return resolve();
            const requestParams = { field: ExistenceCheckType.nickName, value: nickName as string };
            requestToCheckExistence(requestParams)
              .then(result => {
                if (result.data.existence) {
                  reject(t('昵称已存在'));
                } else resolve();
              })
              .catch(error => {
                reject(t('网络异常，请再次尝试'));
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

  const showToast = (message: string, type?: ToastType) => {
    toast(message, { type });
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
        showToast(t('注册成功，即将跳转'), ToastType.success);
        backUrl && setTimeout(() => {
          router.push(backUrl);
        }, 2000);
      })
      .catch((error: ISystemError) => {
        let message: string | undefined;
        if (error && error.type === ErrorEnum.formValidation) {
          // Does not need to show notice, because the form had done this.
          // message = t('请按照提示修改后重试');
        } else {
          message = t('网络异常');
        }
        message && showToast(message, ToastType.error);
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
          { t('注册') }
        </Button>
      </Box>
    </Layout>
  )
};

export const getServerSideProps = getSignUpPageData;

export default SignUpPage;
