import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LANGUAGE } from '../../../config/project';
import { WEBSITE_TITLE } from '../../../config/constant';
import { IPageDataTryResult } from './page-data.interface';
import type {
  TranslationModules,
  IPageBase,
  ILocale,
} from './page-data.interface';
import { DefaultTranslationEnum } from '../../../tools/translation';
import type { SSRConfig } from 'next-i18next';

class PageData {
  static tryToGetPageData = <T extends IPageBase, Y>(
    userTranslationModules: TranslationModules,
    asyncGetPageData: (props: T, locale: ILocale) => Promise<IPageDataTryResult<Y>>
  ) => {
    return (async function(props: T): Promise<IPageDataTryResult<Y>> {
      const translationModules = [...Object.values(DefaultTranslationEnum), ...userTranslationModules];
      let result: IPageDataTryResult<Y>;
      let locales: SSRConfig;
      try {
        const language = props?.locale ?? DEFAULT_LANGUAGE;
        locales = await serverSideTranslations(language, translationModules);
        result = await asyncGetPageData(props, locales._nextI18Next.initialI18nStore[language]);
        Object.assign(result.props, locales);
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
