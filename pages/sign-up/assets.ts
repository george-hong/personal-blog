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
  async (props, locale) => {
    const translation = locale[SignUpLocaleEnum.SignUp];
    return {
      props: {
        meta: {
          title: translation['页面标题'],
          keywords: translation['页面关键字'],
          description: translation['页面描述'],
        },
        pageData: {},
      },
    };
  }
);

export { getSignUpPageData };
