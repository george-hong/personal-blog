import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/client/layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getHomePageData } from './assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import style from './index.module.scss';
import { HomePageLocaleEnum } from './home.interface';
import type { NextPage } from 'next';
import { IPageBaseData } from '../interface/request-response/base.interface';
import { IHomePageData } from './home.interface';

const Home: NextPage<IPageBaseData<IHomePageData>> = (props) => {
  // const headerT = translation.getModule(HomePageLocaleEnum.Header);
  const { pageData, meta, error } = props;
  const route = useRouter();
  const mostViews = pageData?.mostViews;
  const goToArticle = (id: number) => {
    route.push(`/article/detail?id=${id}`);
  };
  return (
    <Layout
      meta={meta}
      error={error}
      sinkIntoHeader
      className={style['home-page-container']}
    >
      <div className={style['home-page']}>
        <Box
          className={style['opacity-area']}
          sx={{
            pt: [null, 1, 2],
            pl: [null, 2, 4],
            pr: [null, 2, 4],
            ml: [-2, null],
            mr: [-2, null],
          }}
        >
          {
            mostViews && (
              <Swiper
                grabCursor
                slidesPerView="auto"
                pagination
                modules={[Pagination]}
                loop
                autoplay={{
                  delay: 1000,
                }}
              >
                {
                  mostViews.map(article => (
                    <SwiperSlide key={article.id}>
                      <Box
                        className={style['swiper-content']}
                        sx={{ padding: [0, 2, 4] }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'opacityBg.main',
                            padding: 4,
                            borderRadius: [null, 1, 2],
                          }}
                          onClick={() => goToArticle(article.id)}
                        >
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{ pb: 1 }}
                          >
                            {article.title}
                          </Typography>
                          <Typography
                            component="p"
                          >
                            { article.summary }
                          </Typography>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </Box>
      </div>
    </Layout>
  )
}

export const getServerSideProps = getHomePageData;

export default Home;
