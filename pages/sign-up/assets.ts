import {
  IRequestWithLocale,
} from '../../interface/request-response/base.interface';
import {
  ISignUpPageData,
  SignUpLocaleEnum,
} from './sign-up.interface';
import PageData from '../../components/server/page-data';

const getSignUpPageData = PageData.tryToGetPageData<IRequestWithLocale, ISignUpPageData>(
  Object.values(SignUpLocaleEnum),
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

export { getSignUpPageData };
