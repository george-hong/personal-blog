export interface IMarkdownBaseOptions {
  content?: string;
  className?: string;
  editable?: boolean;
  onUpdate?: (content: string) => void;
  onMounted?: () => void;
  plugins?: Array<any>;
}

export interface IMarkdownEditorOptions {
  menu?: boolean;
  content?: string;
  cover?: boolean;
  onUpdate?: (content: string) => void;
  onMounted?: () => void;
}

export interface IMarkdownReaderOptions {
  content: string;
  cover?: boolean;
}
