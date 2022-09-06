import React, { ReactElement } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import style from './layout.module.scss';
import type { NextPage } from 'next';

type contentLayoutType = 'middle' | 'thin-middle';

interface ILayoutProps {
  children: any;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  footer?: ReactElement | null | true;
  contentLayout?: contentLayoutType;
  emptyHeight?: boolean;
  submenu?: ReactElement;
}

const contentLayoutAndClassMapping = {
  middle: 'content',
  'thin-middle': 'content thin',
};

const getWrapContent = (children: any, contentLayout?: contentLayoutType, emptyHeight?: boolean) => {
  if (contentLayout) {
    let className = emptyHeight ? 'content-container empty-height' : 'content-container';
    return (
      <div className={className}>
        <div className={contentLayoutAndClassMapping[contentLayout]}>{ children }</div>
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
 * @param {ReactElement | null | true} [props.footer = true] footer content.
 * @param {boolean} [props.middle] Make the content at the center of container.
 * @param {boolean} [props.emptyHeight] Content container set flex-shrink and height to zero.
 * @param {React.Component} [props.submenu] Submenu list for show.
 * @constructor
 */
const Layout: NextPage<ILayoutProps> = (props) => {
  const {
    children,
    sinkIntoHeader,
    containerStyle,
    footer = true,
    contentLayout,
    emptyHeight,
    submenu,
  } = props;
  const content = children ? getWrapContent(children, contentLayout, emptyHeight) : null;
  let className = style.layout;
  if (sinkIntoHeader) className += ` ${style.sunk}`;

  return (
    <div
      className={className}
      style={containerStyle}
    >
      <Header submenu={submenu} />
      {
        content
      }
      {
        footer !== true ?  footer : <Footer />
      }
    </div>
  );
}

export default Layout;
