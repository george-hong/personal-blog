import React, {
  ReactNode,
} from 'react';
import Container from '@mui/material/Container';
import Header from './header';
import Footer from './footer';
import ErrorInfo from './error-info';
import Meta from './meta';
import toast, { ToastType } from '../../../tools/toast';
import useTranslation, { DefaultTranslationEnum } from '../../../tools/translation';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import style from './layout.module.scss';
import type { NextPage } from 'next';
import { ILayoutProps } from './layout.interface';

// Extend the type of material's theme colors.
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    bg: {
      main: string;
    };
    font: {
      main: string;
    },
    description: {
      light: string;
      main: string;
    },
    primaryContrast: {
      light: string;
      main: string;
      dark: string;
    },
    opacityBg: {
      main: string;
    }
  }
}

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    primary: {
      light: '#41AE3C',
      main: '#009D62',
      dark: '#253d24',
    },
    bg: {
      main: '#FFFFFF',
    },
    font: {
      main: '#333333',
    },
    description: {
      light: 'rgba(0, 0, 0, 0.12)',
      main: 'rgba(0, 0, 0, 0.54)',
    },
    primaryContrast: {
      light: '#99999',
      main: '#AAAAAA',
      dark: '#A4A4A4',
    },
    opacityBg: {
      main: 'rgba(255, 255, 255, .5)',
    }
  }
});

const getContent = (error: unknown, children: ReactNode, notContainer = false, contentClassName?: string) => {
  let className = style.main;
  if (contentClassName) className += ` ${contentClassName}`;
  if (error) {
    return (
      <ErrorInfo
        error={error}
        className={className}
      />
    )
  }
  if (!children) return null;
  if (notContainer) {
    return (
      <div className={className}>
        { children }
      </div>
    );
  }
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
 * @param {string} [props.contentClassName] The class of content container.
 * @param {boolean} [props.sinkIntoHeader] Is content sink into header.
 * @param {ReactElement | null | true} [props.footer = true] footer content.
 * @param {boolean} [props.middle] Make the content at the center of container.
 * @param {boolean} [props.autoHideHeader] Auto hide header.
 * @param {boolean} [props.onHeaderVisibilityChange] The callback of header's visibility change.
 * @param {Object} [props.meta] The SEO config of current page.
 * @param {string} [props.meta.title] The page title.
 * @param {string} [props.meta.keywords] The page keywords.
 * @param {string} [props.meta.description] The page description.
 * @param {ReactElement} [props.meta.metaInfo] The extension of page head.
 * @param {*} [props.error] The error info of current page.
 * @constructor
 */
const Layout: NextPage<ILayoutProps> = (props) => {
  const {
    children,
    sinkIntoHeader,
    containerStyle,
    footer = true,
    notContainer,
    autoHideHeader,
    onHeaderVisibilityChange,
    className: userClassName,
    contentClassName,
    meta,
    error,
  } = props;
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const content = getContent(error, children, notContainer, contentClassName);
  const showToast = (message: string) => {
    toast(message, { type: ToastType.success });
  };
  let className = style.layout;
  if (sinkIntoHeader) className += ` ${style.sunk}`;
  if (userClassName) className += ` ${userClassName}`;

  return (
    <ThemeProvider theme={theme}>
      <Meta {...meta}/>
      <div
        className={className}
        style={containerStyle}
      >
        <Header
          autoHide={autoHideHeader}
          onVisibilityChange={onHeaderVisibilityChange}
          onSignIn={() => showToast(t('登录成功'))}
          onSignOut={() => showToast(t('已退出登录'))}
        />
        { content }
        { footer !== true ?  footer : <Footer /> }
      </div>
    </ThemeProvider>
  );
}

export default Layout;
