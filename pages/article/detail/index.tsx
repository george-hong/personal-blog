import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/layout';
import MarkdownReader from '../../../components/markdown-editor/markdown-reader';

export async function getServerSideProps() {
  let result;
  try {
    result = await fetch('http://localhost:8080/api/hello');
    result = await result.json();
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result[0] } };
}

const ArticleDetail: NextPage = (props) => {
  const isUseCover = false;
  const content = props.pageData.content;

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
        <MarkdownReader
          cover={isUseCover}
          content={content}
        />
      </Layout>
    </>
  )
};

export default ArticleDetail;
