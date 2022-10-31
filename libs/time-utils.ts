import dayJS from 'dayjs';

export function timeStampFromJsToDb(timeStamp?: number): string {
  return dayJS(timeStamp)
    .format('YYYY-MM-DD HH:mm:ss');
}
