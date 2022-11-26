import React, { ReactNode, Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import Layout from '../../../components/client/layout';
import { MarkdownReader } from '../../../components/client/markdown-editor';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { getArticleDetailPageData } from './assets';
import { IPageBaseData } from '../../../interface/request-response/base.interface';
import { IArticleDetail } from '../../../interface/request-response/article.interface';

const transformToCoverClass = (className: string, cover?: boolean) => {
  return `${className}${cover ? ` ${style['cover-with-content']}` : ''}`;
}

const ArticleDetail: NextPage<IPageBaseData<IArticleDetail>, ReactNode> = (props) => {
  const isUseCover = false;
  const { pageData, meta, error } = props;

  return (
    <Layout
      meta={meta}
      error={error}
      contentClassName={transformToCoverClass(style['article-detail-page'], isUseCover)}
    >
      {
        pageData && (
          <Fragment>
            <Box>
              <Typography
                variant="h1"
                sx={{ pt: 1, pb: 1, fontSize: 30, fontWeight: 600 }}
              >
                {pageData.title}
              </Typography>
            </Box>
            <Box className={transformToCoverClass(style['markdown-cover-container'], isUseCover)}>
              <MarkdownReader
                cover={isUseCover}
                content={pageData.content}
              />
            </Box>
            <Divider sx={{ pt: 2 }} />
            <Box sx={{ pt: 2, pb: 2, display: 'flex' }}>
              <Typography
                component="span"
                sx={{ pr: 1 }}
              >
                { pageData.nickName }
              </Typography>
              {
                !!pageData.updateTime && (
                  <Typography component="span">
                    更新于 { pageData.updateTime }
                  </Typography>
                )
              }
              <Typography
                component="span"
                sx={{
                  fontWeight: 400,
                  color: 'description.main',
                  flex: 1,
                  pl: 2,
                }}
                fontSize="small"
                classes={{ root: 'content-vertical-center' }}
              >
                <VisibilityIcon sx={{ mr: 1 }} /> { pageData.views }
              </Typography>
            </Box>
          </Fragment>
        )
      }
    </Layout>
  )
};

export const getServerSideProps = getArticleDetailPageData;

export default ArticleDetail;
