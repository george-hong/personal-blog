import { HomePageLocaleEnum } from './home.interface';
import type { IHomePageData } from './home.interface';
import PageData, {
  IPageBase,
} from '../components/server/page-data';

const getHomePageData = PageData.tryToGetPageData<IPageBase, IHomePageData>(
  Object.values(HomePageLocaleEnum),
  async (props) => {
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
  });

export {
  getHomePageData,
};

