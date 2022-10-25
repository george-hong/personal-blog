import React, { ReactNode, Fragment } from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../../../components/front/layout/layout';
import { MarkdownReader } from '../../../components/front/markdown-editor';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { getArticleDetail } from '../../../tools/clientRequest/modules/article';
import { IArticleDetailPageParams } from '../../../interface/article.interface';

interface IArticleDetailProps {
  pageData: {
    content: string;
    title: string;
  };
}

export async function getServerSideProps(props: IArticleDetailPageParams) {
  return await getArticleDetail(props);
}

const transformToCoverClass = (className: string, cover?: boolean) => {
  return `${className}${cover ? ` ${style['cover-with-content']}` : ''}`;
}

const ArticleDetail: NextPage<IArticleDetailProps, ReactNode> = (props) => {
  const isUseCover = false;
  const { content, title } = props.pageData;

  return (
    <Fragment>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>

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
    </Fragment>
  )
};

export default ArticleDetail;
