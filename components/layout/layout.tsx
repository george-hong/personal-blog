import Header from './header/header';
import Footer from './footer/footer';
import style from './layout.module.scss';

interface ILayoutProps {
  children: any;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  noFooter?: boolean;
  middle?: boolean;
}

const getWrapContent = (children: any, middle?: boolean) => {
  if (middle) return (
    <div className="content-container">
      <div className="content">{ children }</div>
    </div>
  );
  return (
    <div className={style.main}>
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
  } = props;
  const content = children ? getWrapContent(children, middle) : null;

  return (
    <div
      className={`${style.layout} ${sinkIntoHeader && style.sunk}`}
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
