import type { NextPage } from 'next'
import Head from 'next/head'
import Style from './index.module.scss';
import Layout from '../../../components/layout/layout';
import MarkdownEditor from '../../../components/markdown-editor/markdown-editor';
import { useState, useEffect } from 'react';


const ArticleEdit: NextPage = () => {
  const [inputContent, setInputContent] = useState('');
  const onChangeContent = (event: any) => {
    setInputContent(event.target.value);
  };
  const isUseCover = true;

  const content =
    `# Main Title # Main Title
    # Main Title
    # Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title# Main Title
    # Main Title
    # Main Title
    # Main Title
      initial content.
    `;

  return (
    <Layout
      noFooter
      middle
      emptyHeight={isUseCover}
    >
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>
      <div className={Style['article-edit-page']}>
        <MarkdownEditor
          cover={isUseCover}
          content={content}
        />
      </div>
    </Layout>
  )
};

export default ArticleEdit;
