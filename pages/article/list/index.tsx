import { useState, Fragment } from 'react';
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
import style from './index.module.scss';
import type { NextPage } from 'next';

export async function getServerSideProps(props) {
  const { pageNo, pageSize } = props.query;
  let result;
  try {
    result = await fetch(`http://localhost:8080/api/article/list`);
    result = await result.json();
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result } };
}

const generateCardItem = (articleInfo: any) => {
  const detailPageURL = `/article/detail?id=${articleInfo.id}`;
  return (
    <Card
      sx={[{ '&:not(:last-child)': { mb: 2 }, borderColor: 'info.main' }]}
      variant="outlined"
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


const ArticleList: NextPage = (props) => {
  const { pageData } = props;
  const [headerVisibility, setHeaderVisibility] = useState<boolean>(true);

  return (
    <Fragment>
      <Head>
        <title>article list</title>
        <meta name="personal-blog" content="文章列表"/>
      </Head>

      <Layout
        contentLayout="thin-middle"
        autoHideHeader
        onHeaderVisibilityChange={setHeaderVisibility}
      >
        <Box
          className={style['list-page']}
          sx={{ pb: 2 }}
        >
          <ListMenu top={!headerVisibility} />
          {
            pageData.map((articleInfo) => generateCardItem(articleInfo))
          }
        </Box>
      </Layout>
    </Fragment>
  )
};

export default ArticleList;
