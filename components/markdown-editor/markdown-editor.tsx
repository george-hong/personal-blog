import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { menu } from '@milkdown/plugin-menu'
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
 * @param {boolean} [props.menu = true] Is show menu.
 * @param {string} [props.content] Initial content when editor created.
 * @param {boolean} [props.cover = false] Is editor cover container.
 * @return component
 * @constructor
 */
const MarkdownEditor: NextPage<IMarkdownEditorOptions> = (props) => {
  const nodes = commonmark;
  const {
    menu: menuButton,
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
    if (menuButton) markdownEditor.use(menu)
    return markdownEditor;
  });

  return (
    <div className={className}>
      <ReactEditor editor={editor}/>
    </div>
  )
};

export default MarkdownEditor;
