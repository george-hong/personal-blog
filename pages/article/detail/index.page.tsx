import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../../../components/front/layout';
import { MarkdownReader } from '../../../components/front/markdown-editor';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { getArticleDetailPageData } from './assets';
import Meta from '../../../components/front/meta';
import { IPageBaseData } from '../../../interface/request-response/base.interface';
import { IArticleDetailPageData } from './detail.interface';

const transformToCoverClass = (className: string, cover?: boolean) => {
  return `${className}${cover ? ` ${style['cover-with-content']}` : ''}`;
}

const ArticleDetail: NextPage<IPageBaseData<IArticleDetailPageData>, ReactNode> = (props) => {
  const isUseCover = false;
  const { pageData, meta } = props;
  // TODO: fix types
  // @ts-ignore
  const { content, title } = pageData;

  return (
    <Meta {...meta}>
      <Layout contentClassName={transformToCoverClass(style['article-detail-page'], isUseCover)}>
        <Box>
          <Typography
            variant="h1"
            sx={{ pt: 1, pb: 1, fontSize: 30, fontWeight: 600 }}
          >
            {title}
          </Typography>
        </Box>
        <Box className={transformToCoverClass(style['markdown-cover-container'], isUseCover)}>
          <MarkdownReader
            cover={isUseCover}
            content={content}
          />
        </Box>
      </Layout>
    </Meta>
  )
};

export const getServerSideProps = getArticleDetailPageData;

export default ArticleDetail;
