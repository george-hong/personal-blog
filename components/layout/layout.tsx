import Header from './header/header';
import Footer from './footer/footer';
import style from './layout.module.scss';

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
    let className = emptyHeight ? 'content empty-height' : 'content';
    return (
      <div className="content-container">
        <div className={className}>{ children }</div>
      </div>
    )
  }
  let className = style.main;
  // if (noShrink) className += ` ${style['no-shrink']}`
  return (
    <div className={className}>
      { children }
    </div>
  );
}

const Layout = (props: ILayoutProps) => {
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
