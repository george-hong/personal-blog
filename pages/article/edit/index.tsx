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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { encodeQuotationMarks } from '../../../tools/methods';

const request = new ClientRequest();

const saveArticle = (title: string, content: string) => {
  request.post('http://localhost:8080/api/article/add', {
    content: encodeQuotationMarks(content),
    title,
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
  const [title, setTitle] = useState('');
  const isUseCover = true;

  return (
    <Layout
      contentLayout="middle"
      emptyHeight={isUseCover}
      footer={null}
    >
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>
      <Box className={Style['article-edit-page']} sx={{ pb: 2 }}>
        <Middle>
          <TextField
            label="Outlined"
            variant="outlined"
            size="small"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ButtonGroup
            variant="contained"
            disableElevation
          >
            <Button variant="outlined">Save draft</Button>
            <Button onClick={() => saveArticle(title, inputContent)}>Publish</Button>
          </ButtonGroup>
        </Middle>
        <MarkdownEditor
          cover={isUseCover}
          content={inputContent}
          onUpdate={setInputContent}
        />
      </Box>
    </Layout>
  )
};

export default ArticleEdit;
