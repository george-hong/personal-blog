import type { NextPage } from 'next'
import Head from 'next/head'
import Style from './index.module.scss';
import Layout from '../../../components/layout/layout';
import MarkdownEditor from '../../../components/markdown-editor/markdown-editor';
import { useState, useEffect } from 'react';
import ClientRequest from '../../../tools/clientRequest';
import Middle from '../../../components/middle/middle';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const request = new ClientRequest();

const saveArticle = (content: string) => {
  request.post('http://localhost:8080/article', { content })
    .then(result => {
      console.log('result', result);
    })
    .catch(error => {
      console.log('error', error);
    });
}

const ArticleEdit: NextPage = () => {
  const [inputContent, setInputContent] = useState('');
  const isUseCover = true;

  return (
    <Layout
      contentLayout="middle"
      emptyHeight={isUseCover}
      footer={(
        <Middle>
          <ButtonGroup
            sx={{ pt: 2, pb: 2 }}
            variant="contained"
            disableElevation
          >
            <Button onClick={() => saveArticle(inputContent)}>Publish</Button>
            <Button variant="outlined">Save draft</Button>
          </ButtonGroup>
        </Middle>
      )}
    >
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>
      <div className={Style['article-edit-page']}>
        <MarkdownEditor
          cover={isUseCover}
          content={inputContent}
          onUpdate={setInputContent}
        />
      </div>
    </Layout>
  )
};

export default ArticleEdit;
