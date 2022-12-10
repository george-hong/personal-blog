import React, { useState, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import Layout from '../../../components/client/layout';
import Empty from '../../../components/client/empty';
// import ListMenu from './components/list-menu';
import useTranslation from '../../../tools/translation';
import InfiniteScroll from '../../../components/client/infinite-scroll';
import style from './index.module.scss';
import type { ITranslation } from '../../../tools/translation';
import type { NextPage } from 'next';
import { getArticleListPageData } from './assets';
import {
  ArticleListLocaleEnum,
  ArticleListPageData,
} from './list.interface';
import { IPageBaseData } from '../../../interface/request-response/base.interface';
import type {
  IArticleListItem,
  IArticleListResponseDetail,
} from '../../../interface/request-response/article.interface';
import { requestToGetArticleList } from '../../../tools/request/modules/article';

const generateCardItem = (articleInfo: IArticleListItem, t: ITranslation) => {
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
        <CardContent sx={{ pb: 0 }}>
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
            { articleInfo.summary }
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid container item xs={6}>
              <Button
                variant="text"
                size="small"
              >
                { t('查看') }
              </Button>
            </Grid>
            <Grid
              className="content-vertical-center content-horizontal-right"
              container
              item xs={6}
            >
              <VisibilityIcon
                fontSize="small"
                color="action"
              />
              <Typography
                sx={{
                  ml: 1,
                  color: 'description.main',
                }}
                component="span"
              >
                { articleInfo.views }
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Link>
    </Card>
  )
};


const ArticleList: NextPage<IPageBaseData<ArticleListPageData>, ReactNode> = (props) => {
  const { pageData, meta, error } = props;
  // const [headerVisibility, setHeaderVisibility] = useState<boolean>(true);
  const { t } = useTranslation(ArticleListLocaleEnum.ArticleList)
  let className = style['list-page'];
  if (!pageData?.data?.length) className += ' full-vertical';
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [articles, setArticles] = useState<Array<IArticleListItem>>((pageData as IArticleListResponseDetail).data);
  const [count, setCount] = useState<number>((pageData as IArticleListResponseDetail).count);
  const requestFillingArticleList = () => {
    const currentPageNumber = pageNumber + 1;
    requestToGetArticleList({ pageNumber: currentPageNumber, pageSize: 10 })
      .then(result => {
        const { count, data } = result.data;
        setArticles(articles.concat(data));
        setCount(count);
        setPageNumber(currentPageNumber);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  return (
    <Layout
      meta={meta}
      error={error}
      // autoHideHeader
      // onHeaderVisibilityChange={setHeaderVisibility}
    >
      {
        pageData && (
          <Box className={className}>
            {/*<ListMenu top={!headerVisibility} />*/}
            <Box className={style['article-list-container']}>
              <InfiniteScroll
                hasMore={articles.length < count}
                dataLength={articles.length}
                next={requestFillingArticleList}
              >
                <Box className={style['article-list-inner-container']}>
                  {
                    articles.length ? articles.map((articleInfo) => generateCardItem(articleInfo, t)) : <Empty cover />
                  }
                </Box>
              </InfiniteScroll>
            </Box>
          </Box>
        )
      }
    </Layout>
  )
};

export const getServerSideProps = getArticleListPageData;

export default ArticleList;
