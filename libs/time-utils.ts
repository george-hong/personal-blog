import dayJS from 'dayjs';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function timeStampFromJsToDb(timeStamp?: number): string {
  return dayJS(timeStamp)
    .format(TIME_FORMAT);
}

export function timeFromDbToJs(timeString: string): string {
  return dayJS(timeString)
    .format(TIME_FORMAT);
}
