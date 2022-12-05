import { marked } from 'marked';

export function getArticleSummary(content: string): string {
  let result = marked
    .parse(content)
    .replace(/<\/?.+?\/?>/g, '')
    .slice(0, 100);
  return result;
}
