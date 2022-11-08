import { HomePageLocaleEnum } from './home.interface';
import type { IHomePageData } from './home.interface';
import PageData, {
  IPageBase,
} from '../components/server/page-data';

const getHomePageData = PageData.tryToGetPageData<IPageBase, IHomePageData>(
  Object.values(HomePageLocaleEnum),
  async (props, locales) => {
    const locale = locales[HomePageLocaleEnum.HomePage];
    return {
      props: {
        meta: {
          title: locale.title,
          keywords: locale.keywords,
          description: locale.description,
        },
        pageData: {},
      },
    };
  });

export {
  getHomePageData,
};

