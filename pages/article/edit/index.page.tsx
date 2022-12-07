import React, {
  Component,
  useState,
} from 'react';
import type { NextPage } from 'next';
import Router from 'next/router';
import style from './index.module.scss';
import Layout from '../../../components/client/layout';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { MarkdownEditor } from '../../../components/client/markdown-editor';
import {
  requestToAddArticle,
  requestToEditArticle,
} from '../../../tools/request/modules/article';
import useTranslation from '../../../tools/translation';
import toast, { ToastType } from '../../../tools/toast';
import {
  IArticleAddParams,
  IArticleEditParams,
} from '../../../interface/request-response/article.interface';
import { IEditArticleResponse } from '../../../interface/request-response/user.interface';
import {
  ArticleEditLocaleEnum,
  IArticleEditPageData,
  IArticleInfo,
} from './edit.interface';
import { getArticleEditPageData } from './assets';
import { IPageBaseData } from '../../../interface/request-response/base.interface';

const saveArticle = (title: string, content: string, pageData?: IArticleInfo) => {
  const params: Partial<IArticleInfo> = {
    content,
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
  const [inputContent, setInputContent] = useState<string>(pageData?.content ?? '');
  const [title, setTitle] = useState<string>(pageData?.title ?? '');
  const { t } = useTranslation(ArticleEditLocaleEnum.ArticleEdit);
  const isUseCover = true;
  const isEdit = pageData?.id !== undefined;
  const saveIfValid = (title: string, content: string, pageData?: IArticleInfo) => {
    if (!title || !content) {
      toast(t('please input title and content'), { type: ToastType.error });
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
              label={t('article title')}
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
              {/* TODO: save draft */}
              {/*<Button variant="outlined">{ t('save draft') }</Button>*/}
              <Button onClick={() => saveIfValid(title, inputContent, pageData)}>{ isEdit ? t('update') : t('publish') }</Button>
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

export const getServerSideProps = getArticleEditPageData;

export default ArticleEdit;
