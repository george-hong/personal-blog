import React, { useState, ReactNode } from 'react';
import { useRouter, NextRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Layout from '../../components/client/layout';
import Empty from '../../components/client/empty';
import style from './index.module.scss';
import type { NextPage } from 'next';
import { getPersonalCenterPageData } from './assets';
import { PersonalCenterPageData } from './user.interface';
import { IPageBaseData } from '../../interface/request-response/base.interface';
import type { IArticleListItem } from '../../interface/request-response/article.interface';

const generateCardItem = (articleInfo: IArticleListItem, router: NextRouter) => {
  const detailPageURL = `/article/detail?id=${articleInfo.id}`;
  const goToEditPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(`/article/edit?id=${articleInfo.id}`);
  };
  return (
    <Card
      classes={{ root: style['list-item'] }}
      sx={[{ '&:not(:last-child)': { mb: 2 }, borderColor: 'info.main' }]}
      variant="outlined"
      key={articleInfo.id}
    >
      <Link
        href={detailPageURL}
        key={articleInfo.id}
      >
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
            { articleInfo.summary }
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={goToEditPage}
          >
            edit
          </Button>
        </CardActions>
      </Link>
    </Card>
  )
};


const PersonalCenterPage: NextPage<IPageBaseData<PersonalCenterPageData>, ReactNode> = (props) => {
  const { pageData, meta, error } = props;
  let className = style['list-page'];
  const router = useRouter();
  if (!pageData?.length) className += ' full-vertical';

  return (
    <Layout
      meta={meta}
      error={error}
    >
      {
        pageData && (
          <Box
            className={className}
            sx={{ pb: 2 }}
          >
            <Box className={style['article-list-container']}>
              <Box className={style['article-list-inner-container']}>
                {
                  pageData.length ? pageData.map((articleInfo) => generateCardItem(articleInfo, router)) : <Empty cover />
                }
              </Box>
            </Box>
          </Box>
        )
      }
    </Layout>
  )
};

export const getServerSideProps = getPersonalCenterPageData;

export default PersonalCenterPage;
