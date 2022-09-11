import * as React from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout/layout';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListMenu from './list-menu';
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
  return (
    <Card
      key={articleInfo.id}
      sx={[{ '&:not(:last-child)': { mb: 2 }, borderColor: 'info.main' }]}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h3" component="div">
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
    </Card>
  )
};


const ArticleList: NextPage = (props) => {
  const { pageData } = props;
  return (
    <React.Fragment>
      <Head>
        <title>article list</title>
        <meta name="personal-blog" content="文章列表"/>
      </Head>

      <Layout
        contentLayout="thin-middle"
        submenu={<ListMenu />}
      >
        <Box sx={{ pt: 2, pb: 2 }}>
          {
            pageData.map((articleInfo) => generateCardItem(articleInfo))
          }
        </Box>
      </Layout>
    </React.Fragment>
  )
};

export default ArticleList;
