import React, { useState, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import Layout from '../../../components/client/layout';
import Empty from '../../../components/client/empty';
// import ListMenu from './components/list-menu';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { getArticleListPageData } from './assets';
import { ArticleListPageData } from './list.interface';
import { IPageBaseData } from '../../../interface/request-response/base.interface';
import { IArticleDetail } from '../../../interface/request-response/article.interface';

const generateCardItem = (articleInfo: IArticleDetail) => {
  const detailPageURL = `/article/detail?id=${articleInfo.id}`;
  return (
    <Card
      classes={{ root: style['list-item'] }}
      sx={[{ '&:not(:last-child)': { mb: 2 }, borderColor: 'description.light' }]}
      variant="outlined"
      key={articleInfo.id}
    >
      <Link
        href={detailPageURL}
        key={articleInfo.id}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="h3"
            color="font.main"
          >
            { articleInfo.title }
          </Typography>
          <Typography
            color="text.secondary"
            className="single-line"
          >
            { articleInfo.content }
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions>
          <Box className="content-horizontal-center">
            <VisibilityIcon
              fontSize="small"
              color="action"
            />
            <Typography
              sx={{ ml: 1, fontSize: 0.8, color: 'description.main' }}
              component="span"
            >12</Typography>
          </Box>
        </CardActions>
      </Link>
    </Card>
  )
};


const ArticleList: NextPage<IPageBaseData<ArticleListPageData>, ReactNode> = (props) => {
  const { pageData, meta, error } = props;
  const [headerVisibility, setHeaderVisibility] = useState<boolean>(true);
  let className = style['list-page'];
  if (!pageData?.length) className += ' full-vertical';

  return (
    <Layout
      meta={meta}
      error={error}
      // autoHideHeader
      // onHeaderVisibilityChange={setHeaderVisibility}
    >
      {
        pageData && (
          <Box
            className={className}
            sx={{ pb: 2 }}
          >
            {/*<ListMenu top={!headerVisibility} />*/}
            <Box className={style['article-list-container']}>
              <Box className={style['article-list-inner-container']}>
                {
                  pageData.length ? pageData.map((articleInfo) => generateCardItem(articleInfo)) : <Empty cover />
                }
              </Box>
            </Box>
          </Box>
        )
      }
    </Layout>
  )
};

export const getServerSideProps = getArticleListPageData;

export default ArticleList;
