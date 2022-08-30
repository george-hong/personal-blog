import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/layout';
import MarkdownReader from '../../../components/markdown-editor/markdown-reader';
const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const isUseCover = false;
  const content = `
  ${id}
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown
  # markdown

  `

  return (
    <>
      <Head>
        <title>article detail</title>
        <meta name="personal-blog" content="文章详情"/>
      </Head>

      <Layout
        middle
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
