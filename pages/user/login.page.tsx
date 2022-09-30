import { ReactNode } from 'react';
import Head from 'next/head';
import Typography from '@mui/material/typography';
import Container from '@mui/material/Container';
import Layout from '../../components/front/layout/layout';
import type { NextPage } from 'next';

interface ILoginProps {

}

const LoginPage: NextPage<ILoginProps, ReactNode> = (props) => {

  return (
    <>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="登录"/>
      </Head>

      <Layout>
        <Container>

        </Container>
      </Layout>
    </>
  )
};

export default LoginPage;
