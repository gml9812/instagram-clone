import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from 'src/styles/GlobalStyle';
import { authClient } from '@apollo/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <ApolloProvider client={authClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
