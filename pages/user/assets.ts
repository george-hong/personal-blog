import {
  getArticleList,
} from '../../tools/request/modules/article';
import PageData from '../../components/server/page-data';
import { PersonalCenterPageData, PersonalCenterLocaleEnum } from './user.interface';
import { IArticleListPageParams } from '../../interface/request-response/article.interface';

const getPersonalCenterPageData = PageData.tryToGetPageData<IArticleListPageParams, PersonalCenterPageData>(
  Object.values(PersonalCenterLocaleEnum),
  async (props, locale) => {
    let articleList;
    const translation = locale[PersonalCenterLocaleEnum.PersonalCenter];
    articleList = await getArticleList(props);
    return {
      props: {
        meta: {
          title: translation.title,
          keywords: translation.keywords,
        },
        pageData: articleList,
      },
    };
  }
);

export {
  getPersonalCenterPageData
};
