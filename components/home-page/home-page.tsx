import style from './home-page.module.scss';
import Layout from '../layout/layout';

const HomePage = () => {
  const content = '# markdown   it\'s content';

  return (
    <Layout
      sinkIntoHeader
      className={style['home-page-container']}
    >
      <div className={style['home-page']}>
        <div className={style['opacity-area']}>
          <article className={style['main-article']}>
            content
          </article>
        </div>
        <div style={{height: 2000}}>

        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
