import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomePageLocaleEnum } from './home.interface';
import type { GetServerSideProps } from 'next';
import type { IPageBaseDataBeforeSend } from '../interface/request-response/base.interface';
import type { IHomePageData } from './home.interface';

const getHomePageData: GetServerSideProps = async ({ locale }): Promise<IPageBaseDataBeforeSend<IHomePageData>> => {
  return {
    props: {
      meta: {
        title: '洪长俊的博客',
        keywords: '前端开发 JavaScript Canvas',
        description: '洪长俊的博客，提供优质前端开发内容，包含JavaScript、Canvas。',
      },
      pageData: {},
      ...(await serverSideTranslations(locale ?? 'zh', Object.values(HomePageLocaleEnum))),
    },
  };
};

export {
  getHomePageData,
};
