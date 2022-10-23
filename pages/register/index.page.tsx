import React, {Fragment, ReactNode, useRef, useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Layout from '../../components/front/layout/layout';
import Notice from '../../components/front/notice/notice';
import Form from '../../components/front/form/form';
import {
  requestToCheckExistence,
  requestToGetRSAPublicKey,
  requestToSignUp,
} from '../../tools/clientRequest/modules/user';
import User from '../../libs/user';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { ISignUpParams } from '../../interface/user.interface';
import { IUniformObject } from '../../interface/base.interface';
import { FormItem, FormItemType, IFormMethods, TriggerType } from '../../components/front/form/form.interface';
import { INoticeMethods, NoticeType } from '../../components/front/notice/notice.interface';

interface IRegisterPageParams {
  query: {
    id?: string;
  }
}

const getRegisterFormConfig = (): Array<FormItem> => {
  return [
    {
      type: FormItemType.Input,
      key: 'name',
      label: '用户名',
      value: '',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: '请填写用户名',
        },
        {
          minLength: 5,
          message: '账号需要至少5个字符',
        },
        {
          custom(name, values, resolve, reject) {
            requestToCheckExistence({ name: (name as string) })
              .then(result => {
                if (result.data.existence) {
                  reject('用户名重复');
                } else resolve();
              })
              .catch(error => {
                reject('网络异常，请再次输入');
              });
          },
        }
      ],
      trigger: [TriggerType.onBlur],
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: '密码',
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: '请填写密码',
        },
        {
          minLength: 8,
          message: '密码需要至少8个字符',
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'passwordRepeat',
      label: '重复密码',
      value: '',
      inputType: 'password',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: '请再次填写密码',
        },
        {
          custom: (value, values, resolve, reject) => {
            if (value === values.password) resolve();
            else reject();
          },
          message: '两次密码输入不一致',
        },
      ]
    }
  ]
};

const RegisterPage: NextPage<IRegisterPageParams, ReactNode> = (props) => {
  const [formConfig, setFormConfig] = useState(getRegisterFormConfig());
  const noticeRef = useRef<INoticeMethods>(null);
  const [publicKey, setPublicKey] = useState<string>('');
  const formRef = useRef<IFormMethods>();
  const router = useRouter();
  let urlParams;
  let backUrl: string;
  // TODO: Extract url parse tool.
  try {
    urlParams = router.asPath.split('?')[1].split('&').reduce((total, keyValueString) => {
      const [key, value] = keyValueString.split('=');
      total[key] = value;
      return total;
    }, {} as IUniformObject<string>);
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
        showNotice('注册成功，即将跳转', NoticeType.success);
        backUrl && setTimeout(() => {
          router.push(backUrl);
        }, 2000);
      })
      .catch(keysOfError => {
        showNotice(validationSuccess ? '请按照提示修改后重试' : '网络异常', NoticeType.error);
      });
  };

  return (
    <Fragment>
      <Head>
        <title>注册</title>
        <meta name="personal-blog" content="注册"/>
      </Head>

      <Layout contentClassName={style.register}>
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
            注册
          </Button>
        </Box>
        <Notice ref={noticeRef} />
      </Layout>
    </Fragment>
  )
};

export default RegisterPage;
