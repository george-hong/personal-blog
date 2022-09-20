import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from '@mui/material/Button';
import style from './index.module.scss';
import Layout from '../components/layout/layout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>personal blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
    </>
  )
}

export default Home
