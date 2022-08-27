import Header from './header/header';
import Footer from './footer/footer';
import style from './layout.module.scss';

interface ILayoutProps {
  children: any;
  sinkIntoHeader?: boolean;
  containerStyle?: object;
  noFooter?: boolean;
}

const Layout = (props: ILayoutProps) => {
  const {
    children,
    sinkIntoHeader,
    containerStyle,
    noFooter,
  } = props;
  return (
    <div
      className={`${style.layout} ${sinkIntoHeader && style.sunk}`}
      style={containerStyle}
    >
      <Header />
      {
        children ? (
          <div className={style.main}>
            { children }
          </div>
        ) : null
      }
      {
        noFooter ? null : <Footer />
      }
    </div>
  );
}

export default Layout;
