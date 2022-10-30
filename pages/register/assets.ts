import { IPageBaseDataBeforeSend } from '../../interface/request-response/base.interface';
import { IRegisterPageData } from './register.interface';

const getRegisterPageData = async (): Promise<IPageBaseDataBeforeSend<IRegisterPageData>> => {
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
};

export { getRegisterPageData };
