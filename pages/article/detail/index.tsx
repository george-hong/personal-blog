import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../../components/layout/layout';
import Middle from "../../../components/middle/middle";
import MarkdownReader from '../../../components/markdown-editor/markdown-reader';
import Typography from '@mui/material/typography';

export async function getServerSideProps(props) {
  const id = props.query.id;
  let result;
  try {
    result = await fetch(`http://localhost:8080/api/article/detail?id=${id}`);
    result = await result.json();
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result[0] } };
}

const ArticleDetail: NextPage = (props) => {
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
        <Middle>
          <Typography
            variant="h1"
            sx={{ pt: 1, pb: 1, fontSize: 30, fontWeight: 600 }}
          >
            {title}
          </Typography>
        </Middle>
        <MarkdownReader
          cover={isUseCover}
          content={content}
        />
      </Layout>
    </>
  )
};

export default ArticleDetail;
