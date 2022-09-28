import { useState, Fragment, ReactNode } from 'react';
import Head from 'next/head';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Layout from '../../../components/layout/layout';
import ListMenu from './components/list-menu';
import Empty from '../../../components/empty/empty';
import { getArticleList } from '../../../tools/clientRequest/modules/article';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { IArticleListPageParams } from '../../../interface/article.interface';

interface IArticleInfo {
  id: number;
  title: string;
  content: string;
}
interface IArticleListProps {
  pageData: Array<IArticleInfo>
}

export async function getServerSideProps(props: IArticleListPageParams) {
  return await getArticleList(props);
}

const generateCardItem = (articleInfo: IArticleInfo) => {
  const detailPageURL = `/article/detail?id=${articleInfo.id}`;
  return (
    <Card
      sx={[{ '&:not(:last-child)': { mb: 2 }, borderColor: 'info.main' }]}
      variant="outlined"
      key={articleInfo.id}
    >
      <Link
        href={detailPageURL}
        key={articleInfo.id}
      >
        <a>
          <CardContent>
            <Typography
              variant="h3"
              component="div"
              color="font.main"
            >
              { articleInfo.title }
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              className="single-line"
            >
              { articleInfo.content }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Like</Button>
          </CardActions>
        </a>
      </Link>
    </Card>
  )
};


const ArticleList: NextPage<IArticleListProps, ReactNode> = (props) => {
  const { pageData } = props;
  const [headerVisibility, setHeaderVisibility] = useState<boolean>(true);
  let className = style['list-page'];
  if (!pageData.length) className += ' full-vertical';

  return (
    <Fragment>
      <Head>
        <title>article list</title>
        <meta name="personal-blog" content="文章列表"/>
      </Head>

      <Layout
        autoHideHeader
        onHeaderVisibilityChange={setHeaderVisibility}
        contentClassName={style['list-container']}
      >
        <Box
          className={className}
          sx={{ pb: 2 }}
        >
          <ListMenu top={!headerVisibility} />
          {
            pageData.length ? pageData.map((articleInfo) => generateCardItem(articleInfo)) : <Empty cover />
          }
        </Box>
      </Layout>
    </Fragment>
  )
};

export default ArticleList;
