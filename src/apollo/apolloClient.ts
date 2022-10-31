import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';
import { CookiesName } from '@libs/values';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

export const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies();
  const accessToken = cookies[CookiesName.accessToken];

  return {
    headers: {
      ...headers,
      'A-TOKEN': accessToken || '',
    },
  };
});

export const serverSideClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
