import dayJS from 'dayjs';

export const timeStampFromJsToDb = (timeStamp?: number): string => {
  return dayJS(timeStamp)
    .format('YYYY-MM-DD HH:mm:ss');
};
