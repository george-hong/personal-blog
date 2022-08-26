import type { NextPage } from 'next'
import Head from 'next/head'
import Style from './index.module.scss';
import Layout from '../../../components/layout/layout';
import { useState, useEffect } from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { menu } from '@milkdown/plugin-menu';


const ArticleEdit: NextPage = () => {
  const [inputContent, setInputContent] = useState('');
  const onChangeContent = (event: any) => {
    setInputContent(event.target.value);
  };

  const { editor } = useEditor((root) => {
    return Editor
      .make()
      .config(context => {
        context.set(rootCtx, root)})
      .use(nord)
      .use(commonmark)
      .use(menu);
  });

  return (
    <Layout noFooter>
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>
      <div className={Style['article-edit-page']}>
        <ReactEditor editor={editor}/>
      </div>
    </Layout>
  )
};

export default ArticleEdit;
