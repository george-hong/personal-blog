import Header from './header/header';
import Footer from './footer/footer';
import style from './layout.module.scss';

const Layout = (props) => {
  const {
    children,
    sinkIntoHeader,
  } = props;
  return (
    <div className={`${style.layout} ${sinkIntoHeader && style.sunk}`}>
      <Header></Header>
      {
        children ? (
          <div className={style['layout-content']}>
            { children }
          </div>
        ) : null
      }
      <Footer></Footer>
    </div>
  );
}

export default Layout;
