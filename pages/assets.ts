import { IPageBaseDataBeforeSend } from '../interface/request-response/base.interface';
import { IHomePageData } from './home.interface';

const getHomePageData = async (): Promise<IPageBaseDataBeforeSend<IHomePageData>> => {
  return {
    props: {
      meta: {
        title: '洪长俊的博客',
        keywords: '前端开发 JavaScript Canvas',
        description: '洪长俊的博客，提供优质前端开发内容，包含JavaScript、Canvas。',
      },
      pageData: {},
    },
  };
};

export { getHomePageData };
