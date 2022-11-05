import { marked } from 'marked';
import style from './markdown-reader.module.scss';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { IMarkdownReaderOptions } from './markdown.interface';

const MarkdownBase = dynamic(() => import('./markdown-base'), { ssr: false })

/**
 *
 * @param {Object} [props] component options
 * @param {string} [props.content] Initial content when editor created.
 * @param {boolean} [props.cover] Is the editor cover it's container.
 * @constructor
 */
const MarkdownReader: NextPage<IMarkdownReaderOptions> = (props) => {
  const {
    content,
    cover,
  } = props;
  let classNameOfContainer = style['reader-container'];
  let classNameOfMarkdown = style[`markdown-reader`];

  if (cover) {
    classNameOfContainer += ` ${style.cover}`;
    classNameOfMarkdown += ` ${style.cover}`;
  }

  return (
    <div className={classNameOfContainer}>
      <div
        className="hidden"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      />
      <MarkdownBase
        content={content}
        className={classNameOfMarkdown}
      />
    </div>
  )
};

export default MarkdownReader;
