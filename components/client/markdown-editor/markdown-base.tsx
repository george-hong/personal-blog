import React from 'react';
import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
} from '@milkdown/core';
import {
  ReactEditor,
  useEditor,
} from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import style from './markdown-base.module.scss';
import type { NextPage } from 'next';
import { IMarkdownBaseOptions } from './markdown.interface';

/**
 *
 * @param {Object} [props] component options
 * @param {string} [props.content] Initial content when editor created.
 * @param {string} [props.className] Extend class for editor.
 * @param {boolean} [props.editable = false] Is editor editable.
 * @constructor
 */
const MarkdownBase: NextPage<IMarkdownBaseOptions> = (props) => {
  const nodes = commonmark;
  const {
    content,
    className: extendClass,
    editable = false,
    config,
    plugins,
  } = props;
  let className = style[`markdown-container`];
  if (extendClass) className += ` ${extendClass}`;

  const { editor } = useEditor(root => {
    const markdownEditor = Editor
      .make()
      .config(context => {
        context.set(rootCtx, root)
        context.set(editorViewOptionsCtx, { editable: () => editable });
        if (content) context.set(defaultValueCtx, content);
        config && config(context);
      })
      .use(nord)
      .use(nodes);
    plugins && plugins.forEach(plugin => markdownEditor.use(plugin));
    return markdownEditor;
  });

  return (
    <div className={className}>
      <ReactEditor editor={editor}/>
    </div>
  )
};

export default MarkdownBase;
