import React from 'react';
import Layout from '../components/client/layout';
import { getHomePageData } from './assets';
import Translation from '../tools/translation';
import { HomePageLocaleEnum } from './home.interface';
import type { NextPage } from 'next';
import style from './index.module.scss';
import { IPageBaseData } from '../interface/request-response/base.interface';
import { IHomePageData } from './home.interface';

const Home: NextPage<IPageBaseData<IHomePageData>> = (props) => {
  const translation = new Translation(Object.values(HomePageLocaleEnum));
  const commonT = translation.getModule(HomePageLocaleEnum.Common);
  const headerT = translation.getModule(HomePageLocaleEnum.Header);
  const { pageData, meta, error } = props;
  return (
    <Layout
      meta={meta}
      error={error}
      sinkIntoHeader
      className={style['home-page-container']}
    >
      <div className={style['home-page']}>
        <div className={style['opacity-area']}>
          <article className={style['main-article']}>
            {commonT('title')}{headerT('article')}
          </article>
        </div>
        <div style={{height: 2000}}>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = getHomePageData;

export default Home;
