import React from 'react';
import { appWithTranslation } from 'next-i18next';
import '../styles/reset.scss';
import '../styles/globals.scss';
import '../styles/fonts.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp);
