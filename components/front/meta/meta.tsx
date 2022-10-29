import React, {
  Component,
  Fragment,
} from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { IMetaProps } from './meta.interface';

/**
 * seo component
 */
const Meta: NextPage<IMetaProps, Component> = (props) => {
  const {
    children, title, keywords, description, metaInfo,
  } = props;

  return (<Fragment>
    <Head>
      {
        !!title && (<title>{ title }</title>)
      }
      {
        !!keywords && (
          <meta
            name="keywords"
            content={ keywords }
          />
        )
      }
      {
        !!description && (
          <meta
            name="description"
            content={ description }
          />
        )
      }
      <link rel="shortcut icon" href="/favicon.ico" />
      {
        !!metaInfo && metaInfo
      }
    </Head>
    { children }
  </Fragment>);
};

export default Meta;
