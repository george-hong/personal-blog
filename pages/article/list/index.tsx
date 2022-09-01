import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../../components/layout/layout';

const ArticleList: NextPage = () => {
  return (
    <>
      <Head>
        <title>article list</title>
        <meta name="personal-blog" content="文章列表"/>
      </Head>

      <Layout middle>
        列表页
      </Layout>
    </>
  )
};

export default ArticleList;
