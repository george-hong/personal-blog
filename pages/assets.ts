import { HomePageLocaleEnum } from './home.interface';
import type { IHomePageData } from './home.interface';
import PageData, {
  IPageBase,
} from '../components/server/page-data';

const getHomePageData = PageData.tryToGetPageData<IPageBase, IHomePageData>(
  Object.values(HomePageLocaleEnum),
  async (props, locale) => {
    const translation = locale[HomePageLocaleEnum.HomePage];
    return {
      props: {
        meta: {
          title: translation.title,
          keywords: translation.keywords,
          description: translation.description,
        },
        pageData: {},
      },
    };
  });

export {
  getHomePageData,
};

