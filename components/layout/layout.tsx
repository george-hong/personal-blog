import Header from './header/header';
import Footer from './footer/footer';
import layoutStyle from './layout.module.scss';

const Layout = (props) => {
  const { children } = props;
  return (
    <div className={layoutStyle.layout}>
      <Header></Header>
      { children }
      <div style={{ height: 2000 }}></div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
