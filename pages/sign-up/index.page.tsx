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

const getSignUpFormConfig = (t: ITranslation): Array<FormItem> => {
  return [
    {
      type: FormItemType.Input,
      key: 'account',
      label: t('account'),
      value: '',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('pleaseInputAccount'),
        },
        {
          minLength: 5,
          message: t('accountNeeds5ChartsAtLeast'),
        },
        {
          custom(account, values, resolve, reject) {
            if (!account) return resolve();
            const requestParams = { field: ExistenceCheckType.account, value: account as string };
            requestToCheckExistence(requestParams)
              .then(result => {
                if (result.data.existence) {
                  reject(t('userNameRepeated'));
                } else resolve();
              })
              .catch(error => {
                reject(t('networkErrorInputAgain'));
              });
          },
        },
      ],
      trigger: [TriggerType.onBlur],
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: t('password'),
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('pleaseInputPasswordAgain'),
        },
        {
          minLength: 8,
          message: t('passwordNeeds8ChartsAtLeast'),
        },
        {
          maxLength: 30,
          message: t('passwordShouldNotLongThan30Charts'),
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'passwordRepeat',
      label: t('repetitivePassword'),
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('pleaseRepetitivePasswordAgain'),
        },
        {
          custom: (value, values, resolve, reject) => {
            if (value === values.password) resolve();
            else reject();
          },
          message: t('twoPasswordsNotMatch'),
        },
      ]
    },
    {
      type: FormItemType.Input,
      key: 'nickName',
      label: t('nickName'),
      value: '',
      inputType: 'text',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: t('pleaseInputNickName'),
        },
        {
          minLength: 2,
          message: t('nickNameNeeds2ChartsAtLeast'),
        },
        {
          maxLength: 20,
          message: t('nickNameShouldNotLongThan20Charts'),
        },
        {
          custom(nickName, values, resolve, reject) {
            if (!nickName) return resolve();
            const requestParams = { field: ExistenceCheckType.nickName, value: nickName as string };
            requestToCheckExistence(requestParams)
              .then(result => {
                if (result.data.existence) {
                  reject(t('nickNameAlreadyExists'));
                } else resolve();
              })
              .catch(error => {
                reject(t('networkErrorPleaseTryAgain'));
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
    let validationSuccess = false;
    let signUpParams: ISignUpParams;
    formRef.current?.validate<ISignUpParams>()
      .then((values) => {
        signUpParams = values;
        validationSuccess = true;
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
        showNotice(t('signUpSuccessRedirectLater'), NoticeType.success);
        backUrl && setTimeout(() => {
          router.push(backUrl);
        }, 2000);
      })
      .catch(keysOfError => {
        showNotice(validationSuccess ? t('pleaseTryAgainAfterModified') : t('networkError'), NoticeType.error);
      });
  };

  return (
    <Layout
      meta={meta}
      error={error}
      contentClassName={style['sign-up']}
    >
      <Box sx={{ pt: 2, pb: 2 }}>
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
          { t('signUp') }
        </Button>
      </Box>
      <Notice ref={noticeRef} />
    </Layout>
  )
};

export const getServerSideProps = getSignUpPageData;

export default SignUpPage;
