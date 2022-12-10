import { HomePageLocaleEnum } from './home.interface';
import type { IHomePageData } from './home.interface';
import PageData, {
  IPageBase,
} from '../components/server/page-data';
import { getRecommendArticles } from '../tools/request/modules/article';

const getHomePageData = PageData.tryToGetPageData<IPageBase, IHomePageData>(
  Object.values(HomePageLocaleEnum),
  async (props, locale) => {
    const translation = locale[HomePageLocaleEnum.HomePage];
    const recommendArticles = await getRecommendArticles();
    return {
      props: {
        meta: {
          title: translation['页面标题'],
          keywords: translation['页面关键字'],
          description: translation['页面描述'],
        },
        pageData: recommendArticles,
      },
    };
  });

export {
  getHomePageData,
};

