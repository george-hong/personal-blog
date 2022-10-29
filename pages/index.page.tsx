import type { NextPage } from 'next';
import Meta from '../components/front/meta';
import style from './index.module.scss';
import Layout from '../components/front/layout';

const Home: NextPage = () => {
  return (
    <Meta
      title="洪长俊的博客"
      keywords="前端开发 JavaScript Canvas"
      description="洪长俊的博客，提供优质前端开发内容，包含JavaScript、Canvas。"
    >
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
    </Meta>
  )
}

export default Home;
