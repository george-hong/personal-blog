import React, { ReactNode, Fragment, useState, useRef } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Layout from '../../components/layout/layout';
import Form, { FormItem, FormItemType, IFormMethods } from '../../components/form/form';
import style from './index.module.scss';
import type { NextPage } from 'next';

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
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: '密码',
      value: '',
      grid: { xs: 12 },
      rules: [
        {
          required: true,
          message: '请填写密码',
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'passwordRepeat',
      label: '重复密码',
      value: '',
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
}

const RegisterPage: NextPage<IRegisterPageParams, ReactNode> = (props) => {
  const [formConfig, setFormConfig] = useState(getRegisterFormConfig());
  const formRef = useRef<IFormMethods>();

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
            onClick={() => {
              formRef.current?.validate()
                .then(() => {
                  console.log('success');
                })
                .catch(keysOfError => {
                  console.log('error fields', keysOfError);
                })
            }}
          >
            注册
          </Button>
        </Box>
      </Layout>
    </Fragment>
  )
};

export default RegisterPage;
