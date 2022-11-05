import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LANGUAGE } from '../../../config/project';
import { WEBSITE_TITLE } from '../../../config/constant';
import { IPageDataTryResult } from './page-data.interface';
import type {
  TranslationModules,
  IPageBase,
} from './page-data.interface';

class PageData {
  static tryToGetPageData = <T extends IPageBase, Y>(
    translationModules: TranslationModules,
    asyncGetPageData: (props: T) => Promise<IPageDataTryResult<Y>>
  ) => {
    return (async function(props: T): Promise<IPageDataTryResult<Y>> {
      let result: IPageDataTryResult<Y>;
      let locale;
      try {
        result = await asyncGetPageData(props);
        // TODO: set header translation as default.
        locale = await serverSideTranslations(props?.locale ?? DEFAULT_LANGUAGE, ['header', ...translationModules]);
        Object.assign(result.props, locale);
      } catch (error) {
        result = {
          props: {
            meta: {
              title: WEBSITE_TITLE,
            },
            error,
          }
        }
      }
      return result;
    });
  }
}

export default PageData;
