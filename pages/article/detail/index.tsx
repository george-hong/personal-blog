import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/layout';
import MarkdownBase from '../../../components/markdown-editor/markdown-base';

const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const content = 'It\'s content ' + id;

  return (
    <>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>

      <Layout middle>
        <MarkdownBase content={content}/>
      </Layout>
    </>
  )
};

export default ArticleDetail;
