import { Ctx } from '@milkdown/core';

export interface IMarkdownBaseOptions {
  content?: string;
  className?: string;
  editable?: boolean;
  config?: (context: Ctx) => void;
  plugins?: Array<any>;
}

export interface IMarkdownEditorOptions {
  menu?: boolean;
  content?: string;
  cover?: boolean;
  onUpdate?: (content: string) => void;
}

export interface IMarkdownReaderOptions {
  content: string;
  cover?: boolean;
}
