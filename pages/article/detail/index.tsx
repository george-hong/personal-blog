import { ReactNode } from 'react';
import Head from 'next/head';
import Typography from '@mui/material/typography';
import Container from '@mui/material/Container';
import Layout from '../../../components/layout/layout';
import MarkdownReader from '../../../components/markdown-editor/markdown-reader';
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

const ArticleDetail: NextPage<IArticleDetailProps, ReactNode> = (props) => {
  const isUseCover = false;
  const { content, title } = props.pageData;

  return (
    <>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>

      <Layout
        contentLayout="middle"
        emptyHeight={isUseCover}
      >
        <Container>
          <Typography
            variant="h1"
            sx={{ pt: 1, pb: 1, fontSize: 30, fontWeight: 600 }}
          >
            {title}
          </Typography>
          <MarkdownReader
            cover={isUseCover}
            content={content}
          />
        </Container>
      </Layout>
    </>
  )
};

export default ArticleDetail;
