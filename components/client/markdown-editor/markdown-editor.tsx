import React from 'react';
import { menu } from '@milkdown/plugin-menu';
import { history } from '@milkdown/plugin-history';
import style from './markdown-editor.module.scss';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { IMarkdownEditorOptions } from './markdown.interface';

const MarkdownBase = dynamic(() => import('./markdown-base'), { ssr: false })
/**
 * @constructor
 * @param {Object} [props] component options
 * @param {String} [props.content] Initial content when editor created.
 * @param {boolean} [props.cover = false] Is the editor cover it's container.
 * @param {Function} [props.onUpdate] The update handler.
 * @param {Function} [props.onMounted] The component mounted handler.
 * @return component
 *
 */
const MarkdownEditor: NextPage<IMarkdownEditorOptions> = (props) => {
  const { content, cover, onUpdate, onMounted } = props;
  const plugins = [menu, history];
  let className = style[`markdown-editor`];
  if (cover) className += ` ${style.cover}`;

  return (
    <MarkdownBase
      className={className}
      content={content}
      editable
      plugins={plugins}
      onUpdate={onUpdate}
      onMounted={onMounted}
    />
  )
};

export default MarkdownEditor;
