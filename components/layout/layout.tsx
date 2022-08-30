import Header from './header/header';
import Footer from './footer/footer';
import style from './layout.module.scss';
import type { NextPage } from 'next';

interface ILayoutProps {
  children: any;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  noFooter?: boolean;
  middle?: boolean;
  emptyHeight?: boolean;
}

const getWrapContent = (children: any, middle?: boolean, emptyHeight?: boolean) => {
  if (middle) {
    let className = emptyHeight ? 'content-container empty-height' : 'content-container';
    return (
      <div className={className}>
        <div className="content">{ children }</div>
      </div>
    )
  }
  let className = style.main;
  if (emptyHeight) className += ` ${style['empty-height']}`
  return (
    <div className={className}>
      { children }
    </div>
  );
}

/**
 * layout component
 * @param {Object} props
 * @param {boolean} [props.sinkIntoHeader] Is content sink into header.
 * @param {string} [props.containerStyle] The custom style of outer container.
 * @param {boolean} [props.noFooter] Don't add footer component.
 * @param {boolean} [props.middle] Make the content at the center of container.
 * @param {boolean} [props.emptyHeight] Content container set flex-shrink and height to zero.
 * @constructor
 */
const Layout: NextPage<ILayoutProps> = (props) => {
  const {
    children,
    sinkIntoHeader,
    containerStyle,
    noFooter,
    middle,
    emptyHeight,
  } = props;
  const content = children ? getWrapContent(children, middle, emptyHeight) : null;
  let className = style.layout;
  if (sinkIntoHeader) className += ` ${style.sunk}`;

  return (
    <div
      className={className}
      style={containerStyle}
    >
      <Header />
      {
        content
      }
      {
        noFooter ? null : <Footer />
      }
    </div>
  );
}

export default Layout;
