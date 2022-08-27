import { Editor, rootCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { menu } from '@milkdown/plugin-menu'
import style from './markdown-editor.module.scss';

const MarkdownEditor = () => {
  const nodes = commonmark;

  const { editor } = useEditor((root) => {
    return Editor
      .make()
      .config(context => {
        context.set(rootCtx, root)})
      .use(nord)
      .use(nodes)
      .use(menu);
  });

  return (
    <div className={style['markdown-container']}>
      <ReactEditor editor={editor}/>
    </div>
  )
};

export default MarkdownEditor;
