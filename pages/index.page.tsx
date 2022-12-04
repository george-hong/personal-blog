import React from 'react';
import Layout from '../components/client/layout';
import Box from '@mui/material/Box';
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
  const mostViews = pageData?.mostViews;
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
            pt: 2,
            pl: 4,
            pr: 4,
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
                        sx={{ padding: 4 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'opacityBg.main',
                            padding: 4,
                            borderRadius: 1,
                          }}
                        >
                          {article.title}
                          <p>{ article.summary }</p>
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
