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

const generateCardItem = (info: any) => {
  return (
    <Card
      key={info.key}
      sx={[{ '&:not(:last-child)': { mb: 2 }, borderColor: 'info.main' }]}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Good Job
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
};


const ArticleList: NextPage = () => {
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
            Array.apply(undefined, { length: 20 }).map((i, index) => generateCardItem({ key: index }))
          }
        </Box>
      </Layout>
    </React.Fragment>
  )
};

export default ArticleList;
