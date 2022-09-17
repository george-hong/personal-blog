import React, { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Header from './header/header';
import Footer from './footer/footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import style from './layout.module.scss';
import type { NextPage } from 'next';

type contentLayoutType = 'middle' | 'thin-middle';

interface ILayoutProps {
  className: string;
  children: ReactNode;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  footer?: ReactNode | null | true;
  contentLayout?: contentLayoutType;
  emptyHeight?: boolean;
  autoHideHeader?: boolean;
  onHeaderVisibilityChange?: (visibility: boolean) => void;
}

// Extend the type of material's theme colors.
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    bg: {
      main: string;
    };
    font: {
      main: string;
    }
  }
}

const theme = createTheme({
  palette: {
    bg: {
      main: '#FFFFFF',
    },
    font: {
      main: '#333333',
    }
  }
});

const getWrapContent = (children: any, contentLayout?: contentLayoutType, emptyHeight?: boolean) => {
  let className = style.main;
  if (emptyHeight) className += ` ${style['empty-height']}`;
  return (
    <Container classes={{ root: className }}>
      { children }
    </Container>
  );
}

/**
 * layout component
 * @param {Object} props
 * @param {string} [props.className] The class of outer container.
 * @param {boolean} [props.sinkIntoHeader] Is content sink into header.
 * @param {ReactElement | null | true} [props.footer = true] footer content.
 * @param {boolean} [props.middle] Make the content at the center of container.
 * @param {boolean} [props.emptyHeight] Content container set flex-shrink and height to zero.
 * @param {boolean} [props.autoHideHeader] Auto hide header.
 * @param {boolean} [props.onHeaderVisibilityChange] The callback of header's visibility change.
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
    autoHideHeader,
    onHeaderVisibilityChange,
    className: userClassName,
  } = props;
  const content = children ? getWrapContent(children, contentLayout, emptyHeight) : null;
  let className = style.layout;
  if (sinkIntoHeader) className += ` ${style.sunk}`;
  if (userClassName) className += ` ${userClassName}`;

  return (
    <ThemeProvider theme={theme}>
      <div
        className={className}
        style={containerStyle}
      >
        <Header
          autoHide={autoHideHeader}
          onVisibilityChange={onHeaderVisibilityChange}
        />
        {
          content
        }
        {
          footer !== true ?  footer : <Footer />
        }
      </div>
    </ThemeProvider>
  );
}

export default Layout;
