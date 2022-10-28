export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

export function getStringByteLength(str: unknown): number {
  let result = 0;
  if (!isString(str)) return result;
  let length = (str as string).length;
  let index = 0;
  for (; index < length; index++) {
    const charCode = (str as string).charCodeAt(index);
    if (charCode <= 0x007f) {
      result += 1;
    } else if (charCode <= 0x07ff) {
      result += 2;
    } else if (charCode <= 0xffff) {
      result += 3;
    } else {
      result += 4;
    }
  }
  return result;
}

export function splitStringByByteLength(str: unknown, maxSpacePerGroup: number): Array<string> {
  const result: Array<string> = [];
  const space = maxSpacePerGroup > 3 ? Math.floor(maxSpacePerGroup) : 4;
  const targetString = (isString(str) ? str : String(str)) as string;
  let previousPosition = 0;
  let currentLength = 0;
  let index = 0;
  let length = targetString.length;
  for (; index < length; index++) {
    const isLastChar = index === length - 1;
    const charByteLength = getStringByteLength(targetString[index]);
    const isSumBiggerThanSpace = (currentLength + charByteLength) > space;
    if (isLastChar && isSumBiggerThanSpace) {
      result.push(targetString.slice(previousPosition, index));
      result.push(targetString.slice(index, index + 1));
    } else if (isLastChar) {
      result.push(targetString.slice(previousPosition, index + 1));
    } else if (isSumBiggerThanSpace) {
      result.push(targetString.slice(previousPosition, index));
      previousPosition = index;
      currentLength = charByteLength;
    } else {
      currentLength += charByteLength;
    }
  }
  return result;
}
