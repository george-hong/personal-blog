import MarkdownBase from './markdown-base';
import { menu } from '@milkdown/plugin-menu'
import { history } from '@milkdown/plugin-history';
import style from './markdown-editor.module.scss';
import type { NextPage } from 'next';

interface IMarkdownEditorOptions {
  menu?: boolean;
  content?: string;
  cover?: boolean;
}

/**
 *
 * @param {Object} [props] component options
 * @param {string} [props.content] Initial content when editor created.
 * @param {boolean} [props.cover = false] Is the editor cover it's container.
 * @return component
 * @constructor
 */
const MarkdownEditor: NextPage<IMarkdownEditorOptions> = (props) => {
  const { content, cover } = props;
  const plugins = [menu, history];
  let className = style[`markdown-editor`];
  if (cover) className += ` ${style.cover}`;

  return (
    <MarkdownBase
      className={className}
      content={content}
      editable
      plugins={plugins}
    />
  )
};

export default MarkdownEditor;
