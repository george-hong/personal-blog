import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/layout';

const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>

      <Layout>
        article detail id: { id }
        <Link href="/">
          <a>back home</a>
        </Link>
      </Layout>
    </>
  )
};

export default ArticleDetail;