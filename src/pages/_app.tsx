import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from 'src/styles/GlobalStyle';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
