import React, { ReactNode, useRef } from 'react';
import Container from '@mui/material/Container';
import Header from './header';
import Footer from './footer/footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import style from './layout.module.scss';
import type { NextPage } from 'next';
import Notice, {
  NoticeType,
  INoticeMethods,
} from '../notice';

interface ILayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  footer?: ReactNode | null | true;
  notContainer?: boolean;
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

const getContent = (children: ReactNode, notContainer = false, contentClassName?: string) => {
  let className = style.main;
  if (contentClassName) className += ` ${contentClassName}`;
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
  } = props;
  const content = children ? getContent(children, notContainer, contentClassName) : null;
  const noticeRef = useRef<INoticeMethods>(null);
  const showNotice = (message: string) => {
    noticeRef.current?.notice(message, { type: NoticeType.success });
  };
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
          onLogin={() => showNotice('登录成功')}
          onLogout={() => showNotice('已退出登录')}
        />
        <Notice ref={noticeRef} />
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
