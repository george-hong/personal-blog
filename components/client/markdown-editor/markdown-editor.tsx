import React from 'react';
import { menu } from '@milkdown/plugin-menu';
import { history } from '@milkdown/plugin-history';
import {
  listener,
  listenerCtx,
} from '@milkdown/plugin-listener';
import { Ctx } from '@milkdown/ctx';
import style from './markdown-editor.module.scss';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { IMarkdownEditorOptions } from './markdown.interface';

const MarkdownBase = dynamic(() => import('./markdown-base'), { ssr: false })
const configHandler = function(onUpdate?: (content: string) => void) {
  return function(context: Ctx) {
    context.get(listenerCtx)
      .markdownUpdated((ctx, doc) => {
        onUpdate && onUpdate(doc);
      });
  }

};
/**
 *
 * @param {Object} [props] component options
 * @param {string} [props.content] Initial content when editor created.
 * @param {boolean} [props.cover = false] Is the editor cover it's container.
 * @param {Function} [props.onUpdate] update handler.
 * @return component
 * @constructor
 */
const MarkdownEditor: NextPage<IMarkdownEditorOptions> = (props) => {
  const { content, cover, onUpdate } = props;
  const plugins = [menu, history, listener];
  let className = style[`markdown-editor`];
  if (cover) className += ` ${style.cover}`;

  return (
    <MarkdownBase
      className={className}
      content={content}
      editable
      plugins={plugins}
      config={configHandler(onUpdate)}
    />
  )
};

export default MarkdownEditor;
