import { ReactNode, Fragment } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import style from './index.module.scss';
import type { NextPage } from 'next';

interface IRegisterPageParams {
  query: {
    id?: string;
  }
}

const RegisterPage: NextPage<IRegisterPageParams, ReactNode> = (props) => {

  return (
    <Fragment>
      <Head>
        <title>注册</title>
        <meta name="personal-blog" content="注册"/>
      </Head>

      <Layout>
        sign in
      </Layout>
    </Fragment>
  )
};

export default RegisterPage;
