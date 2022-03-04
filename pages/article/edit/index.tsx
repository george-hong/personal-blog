import type { NextPage } from 'next'
import Head from 'next/head'
import Style from './index.module.scss';
import ReactMarkdown from 'react-markdown'
import Layout from '../../../components/layout/layout';

const ArticleEdit: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>
      <div className={Style['article-edit-page']}>
        <ReactMarkdown># Hello, *world*!</ReactMarkdown>
      </div>
    </Layout>
  )
};

export default ArticleEdit;
