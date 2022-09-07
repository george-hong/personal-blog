export const encodeQuotationMarks = (source: string, transformDouble = false): string => {
  const result = source.replace(/\'/g, '&#39');
  if (transformDouble) return result.replace(/\"/g, '&#34');
  return result;
};

export const decodeQuotationMarks = (source: string, transformDouble = false): string => {
  const result = source.replace(/&#39/g, "'");
  if (transformDouble) return result.replace(/&#34/g, '"');
  return result;
};
