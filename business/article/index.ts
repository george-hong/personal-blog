import { marked } from 'marked';

export function getArticleSummary(content: string): string {
  console.log('content', content);
  let result = marked
    .parse(content)
    .replace(/<\/?.+?\/?>/g, '');
  return result;
}
