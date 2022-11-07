import { ReactNode } from 'react';
import Head from 'next/head';
import Typography from '@mui/material/typography';
import Container from '@mui/material/Container';
import Layout from '../../components/client/layout';
import type { NextPage } from 'next';

interface ISignInProps {

}

const SignInPage: NextPage<ISignInProps, ReactNode> = (props) => {

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

export default SignInPage;
