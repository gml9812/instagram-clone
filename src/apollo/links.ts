import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';
import { CookiesKeys } from 'src/lib/values';
// import { onError } from '@apollo/client/link/error';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

export const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies();
  const accessToken = cookies[CookiesKeys.accessToken];
  return {
    headers: {
      ...headers,
      'A-TOKEN': accessToken || '',
    },
  };
});
