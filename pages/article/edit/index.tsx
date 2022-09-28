import type { NextPage } from 'next'
import { Component } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import style from './index.module.scss';
import Layout from '../../../components/layout/layout';
import MarkdownEditor from '../../../components/markdown-editor/markdown-editor';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { encodeQuotationMarks } from '../../../tools/methods';
import { getArticleDetail } from '../../../tools/clientRequest/modules/article';
import { generateClientRequest } from '../../../tools/clientRequest';


interface IArticleEditPageParams {
  query: {
    id?: string;
  }
}
interface IArticleInfo {
  id: number;
  content: string;
  title: string;
}
interface IArticleEditProps {
  pageData?: IArticleInfo;
}

export async function getServerSideProps(props: IArticleEditPageParams) {
  const id = props.query.id;
  if (id === undefined) return { props: {} };
  return await getArticleDetail(props);
}

const request = generateClientRequest();

const saveArticle = (title: string, content: string, pageData?: IArticleInfo) => {
  const params: Partial<IArticleInfo> = {
    content: encodeQuotationMarks(content),
    title,
  };
  if (pageData) {
    params.id = pageData.id;
  }
  request.post(`/api/article/${pageData?.id === undefined ? 'add' : 'update'}`, params)
    .then(result => {
      Router.push(`/article/detail?id=${result.id}`);
    })
    .catch(error => {
      console.log('error', error);
    });
}

const transformToCoverClass = (className: string, cover?: boolean) => {
  return `${className}${cover ? ` ${style['cover-with-content']}` : ''}`;
}

const ArticleEdit: NextPage<IArticleEditProps, Component> = (props) => {
  const { pageData } = props;
  const [inputContent, setInputContent] = useState(pageData?.content ?? '');
  const [title, setTitle] = useState(pageData?.title ?? '');
  const isUseCover = true;

  return (
    <Layout
      contentClassName={transformToCoverClass(style['edit-page-layout'], isUseCover)}
      footer={null}
    >
      <Head>
        <title>article detail</title>
        <meta name="编辑文章" content="编辑文章"/>
      </Head>

      <Box
        className={transformToCoverClass(style['article-edit-page'], isUseCover)}
        sx={{ pb: 2 }}
      >
        <Box className={style['inner-box']}>
          <Box className={style['article-layout']}>
            <TextField
              sx={{ flex: 1, margin: 2, ml: 0 }}
              label="title"
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ButtonGroup
              sx={{ mt: 2, mb: 2 }}
              variant="contained"
              disableElevation
            >
              <Button variant="outlined">Save draft</Button>
              <Button onClick={() => saveArticle(title, inputContent, pageData)}>Publish</Button>
            </ButtonGroup>
          </Box>
          <Box className={transformToCoverClass(style['markdown-cover-container'], isUseCover)}>
            <MarkdownEditor
              cover={isUseCover}
              content={inputContent}
              onUpdate={setInputContent}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
};

export default ArticleEdit;
