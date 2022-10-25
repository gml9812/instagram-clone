import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from 'src/styles/GlobalStyle';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { authLink, httpLink } from '@apollo/links';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
