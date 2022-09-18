import { ReactNode, Fragment } from 'react';
import Head from 'next/head';
import Typography from '@mui/material/typography';
import Box from '@mui/material/Box';
import Layout from '../../../components/layout/layout';
import MarkdownReader from '../../../components/markdown-editor/markdown-reader';
import style from './index.module.scss';
import type { NextPage } from 'next';

interface IArticleDetailPageParams {
  query: {
    id?: string;
  }
}
interface IArticleDetailProps {
  pageData: {
    content: string;
    title: string;
  };
}

export async function getServerSideProps(props: IArticleDetailPageParams) {
  const id = props.query.id;
  let result;
  try {
    result = await fetch(`http://localhost:3000/api/article/detail?id=${id}`);
    result = await result.json();
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result[0] } };
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
