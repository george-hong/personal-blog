import React, { ReactNode, Fragment, useState } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Layout from '../../components/layout/layout';
import Form, { FormItemType } from '../../components/Form/form';
import style from './index.module.scss';
import type { NextPage } from 'next';

interface IRegisterPageParams {
  query: {
    id?: string;
  }
}

const getRegisterFormConfig = () => {
  return [
    {
      type: FormItemType.Input,
      key: 'name',
      label: '用户名',
      value: '',
      rules: [
        {
          required: true,
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'password',
      label: '密码',
      value: '',
      rules: [
        {
          required: true,
        }
      ]
    },
    {
      type: FormItemType.Input,
      key: 'passwordRepeat',
      label: '重复密码',
      value: '',
      rules: [
        {
          required: true,
        }
      ]
    }
  ]
}

const RegisterPage: NextPage<IRegisterPageParams, ReactNode> = (props) => {
  const [formConfig, setFormConfig] = useState(getRegisterFormConfig());

  return (
    <Fragment>
      <Head>
        <title>注册</title>
        <meta name="personal-blog" content="注册"/>
      </Head>

      <Layout>
        <Box sx={{ pt: 2, pb: 2 }}>
          <Form config={formConfig}/>
        </Box>
      </Layout>
    </Fragment>
  )
};

export default RegisterPage;
