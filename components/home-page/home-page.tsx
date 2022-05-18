import style from './home-page.module.scss';
import Layout from '../layout/layout';

const HomePage = () => {
  return (
    <Layout sinkIntoHeader>
      <div className={style['home-page']}>
        home page
      </div>
    </Layout>
  );
}

export default HomePage;
