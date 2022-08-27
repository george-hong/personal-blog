import { Editor, rootCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { menu } from '@milkdown/plugin-menu'
// import './markdown-editor.module.scss';

const MarkdownEditor = () => {
  const { editor } = useEditor((root) => {
    return Editor
      .make()
      .config(context => {
        context.set(rootCtx, root)})
      .use(nord)
      .use(commonmark)
      .use(menu);
  });

  return <ReactEditor editor={editor}/>
};

export default MarkdownEditor;
