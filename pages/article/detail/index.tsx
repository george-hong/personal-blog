import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const ArticleDetail: NextPage = () => {
  return (
    <div>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>
      article detail
      <Link href="/">
        <a>back home</a>
      </Link>
    </div>
  )
};

export default ArticleDetail;