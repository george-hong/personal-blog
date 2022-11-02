import React, {
  Component,
  useRef,
  useState,
} from 'react';
import type { NextPage } from 'next';
import Router from 'next/router';
import style from './index.module.scss';
import Layout from '../../../components/front/layout';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { MarkdownEditor } from '../../../components/front/markdown-editor';
import Notice, {
  INoticeMethods,
  NoticeType,
} from '../../../components/front/notice';
import { encodeQuotationMarks } from '../../../tools/methods';
import {
  requestToAddArticle,
  requestToEditArticle,
} from '../../../tools/request/modules/article';
import {
  IArticleAddParams,
  IArticleEditParams,
} from '../../../interface/request-response/article.interface';
import { IEditArticleResponse } from '../../../interface/request-response/user.interface';
import {
  IArticleEditPageData,
  IArticleInfo,
} from './edit.interface';
import { getArticleEditPageData } from './assets';
import { IPageBaseData } from '../../../interface/request-response/base.interface';

const saveArticle = (title: string, content: string, pageData?: IArticleInfo) => {
  const params: Partial<IArticleInfo> = {
    content: encodeQuotationMarks(content),
    title,
  };
  let isEdit = false;
  if (pageData) {
    isEdit = true;
    params.id = pageData.id;
  }
  const requestMethod = isEdit ?
    requestToEditArticle(params as IArticleEditParams) :
    requestToAddArticle(params as IArticleAddParams);
  requestMethod
    .then((result: IEditArticleResponse) => {
      Router.push(`/article/detail?id=${result.data.id}`);
    })
    .catch(error => {
      console.log('error', error);
    });
}

const transformToCoverClass = (className: string, cover?: boolean) => {
  return `${className}${cover ? ` ${style['cover-with-content']}` : ''}`;
}

const ArticleEdit: NextPage<IPageBaseData<IArticleEditPageData>, Component> = (props) => {
  const { pageData, meta, error } = props;
  const [inputContent, setInputContent] = useState(pageData?.content ?? '');
  const [title, setTitle] = useState(pageData?.title ?? '');
  const noticeRef = useRef<INoticeMethods>(null);
  const isUseCover = true;
  const isEdit = pageData?.id !== undefined;
  const saveIfValid = (title: string, content: string, pageData?: IArticleInfo) => {
    if (!title || !content) {
      noticeRef.current?.notice('请输入标题和内容', { type: NoticeType.error });
      return;
    }
    saveArticle(title, inputContent, pageData);
  }

  return (
    <Layout
      meta={meta}
      error={error}
      contentClassName={transformToCoverClass(style['edit-page-layout'], isUseCover)}
      footer={null}
    >
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
              <Button variant="outlined">保存草稿</Button>
              <Button onClick={() => saveIfValid(title, inputContent, pageData)}>{ isEdit ? '更新' : '发布' }</Button>
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

      <Notice ref={noticeRef} />
    </Layout>
  )
};

export const getServerSideProps = getArticleEditPageData;

export default ArticleEdit;
