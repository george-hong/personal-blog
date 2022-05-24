import type { NextPage } from 'next'
import Head from 'next/head'
import Style from './index.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Layout from '../../../components/layout/layout';
import { useState } from 'react';

const ArticleEdit: NextPage = () => {
  const [inputContent, setInputContent] = useState('');
  const onChangeContent = (event: any) => {
    setInputContent(event.target.value);
  };

  return (
    <Layout>
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>
      <div className={Style['article-edit-page']}>
        <textarea onChange={onChangeContent} value={inputContent}></textarea>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {inputContent}
        </ReactMarkdown>
      </div>
    </Layout>
  )
};

export default ArticleEdit;
