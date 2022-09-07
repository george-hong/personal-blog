import type { NextPage } from 'next'
import { Component } from 'react';
import Head from 'next/head'
import Style from './index.module.scss';
import Layout from '../../../components/layout/layout';
import MarkdownEditor from '../../../components/markdown-editor/markdown-editor';
import { useState, useEffect } from 'react';
import ClientRequest from '../../../tools/clientRequest';
import Middle from '../../../components/middle/middle';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { encodeQuotationMarks } from '../../../tools/methods';

const request = new ClientRequest();

const saveArticle = (content: string) => {
  request.post('http://localhost:8080/api/article/add', {
    content: encodeQuotationMarks(content),
    title: 'test',
  })
    .then(result => {
      console.log('result', result);
    })
    .catch(error => {
      console.log('error', error);
    });
}



const ArticleEdit: NextPage<void, Component> = () => {
  const [inputContent, setInputContent] = useState('');
  const isUseCover = true;

  return (
    <Layout
      contentLayout="middle"
      emptyHeight={isUseCover}
      footer={(
        <Middle type="right">
          <ButtonGroup
            sx={{ pt: 2, pb: 2 }}
            variant="contained"
            disableElevation
          >
            <Button variant="outlined">Save draft</Button>
            <Button onClick={() => saveArticle(inputContent)}>Publish</Button>
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
