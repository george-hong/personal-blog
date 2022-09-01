import style from './home-page.module.scss';
import Layout from '../layout/layout';

const containerStyle = {
  backgroundImage: 'url(./images/bg.jpg)',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
};

const HomePage = () => {
  const content = '# markdown   it\'s content';

  return (
    <Layout
      sinkIntoHeader
      containerStyle={containerStyle}
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
