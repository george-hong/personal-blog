import { WEBSITE_TITLE } from '../../../config/constant';
import { IPageDataTryResult } from './page-data.interface';

class PageData {
  static tryToGetPageData = <T, Y>(asyncGetPageData: (props: T) => Promise<IPageDataTryResult<Y>>) => {
    return (async function(props: T): Promise<IPageDataTryResult<Y>> {
      let result: IPageDataTryResult<Y>;
      try {
        result = await asyncGetPageData(props);
      } catch (error) {
        result = {
          props: {
            meta: {
              title: WEBSITE_TITLE,
            }
          }
        }
      }
      return result;
    });
  }
}

export default PageData;
