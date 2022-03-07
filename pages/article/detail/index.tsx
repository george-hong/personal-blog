import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>
      article detail id: { id }
      <Link href="/">
        <a>back home</a>
      </Link>
    </div>
  )
};

export default ArticleDetail;