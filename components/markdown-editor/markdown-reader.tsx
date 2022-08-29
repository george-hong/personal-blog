import MarkdownBase from './markdown-base';
import style from './markdown-reader.module.scss';
import type { NextPage } from 'next';

interface IMarkdownReaderOptions {
  content?: string;
  cover?: boolean;
}

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
  let className = style[`markdown-reader`];

  if (cover) className += ` ${style.cover}`;

  return (
    <MarkdownBase
      content={content}
      className={className}
    />
  )
};

export default MarkdownReader;
