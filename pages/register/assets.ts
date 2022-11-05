import {
  IRequestWithLocale,
} from '../../interface/request-response/base.interface';
import {
  IRegisterPageData,
  RegisterLocaleEnum,
} from './register.interface';
import PageData from '../../components/server/page-data';

const getRegisterPageData = PageData.tryToGetPageData<IRequestWithLocale, IRegisterPageData>(
  Object.values(RegisterLocaleEnum),
  async () => {
    return {
      props: {
        meta: {
          title: '注册',
          keywords: '用户注册 博客注册',
          description: '洪长俊的博客，提供优质前端开发内容，包含JavaScript、Canvas。',
        },
        pageData: {},
      },
    };
  }
);

export { getRegisterPageData };
