import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import style from './markdown-base.module.scss';
import type { NextPage } from 'next';

interface IMarkdownBaseOptions {
  menu?: boolean;
  content?: string;
  cover?: boolean;
}

/**
 *
 * @param {Object} [props] component options
 * @param {string} [props.content] Initial content when editor created.
 * @param {boolean} [props.cover = false] Is editor cover container.
 * @param {boolean} [props.editable = false] Is editor cover container.
 * @constructor
 */
const MarkdownBase: NextPage<IMarkdownBaseOptions> = (props) => {
  const nodes = commonmark;
  const {
    content,
    cover,
  } = props;
  let className = style[`markdown-container`];
  if (cover) className += ` ${style.cover}`;

  const { editor } = useEditor(root => {
    const markdownEditor = Editor
      .make()
      .config(context => {
        context.set(rootCtx, root)
        if (content) context.set(defaultValueCtx, content);
      })
      .use(nord)
      .use(nodes);
    return markdownEditor;
  });

  return (
    <div className={className}>
      <ReactEditor editor={editor}/>
    </div>
  )
};

export default MarkdownBase;
