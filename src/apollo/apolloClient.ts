import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  Operation,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { parseCookies } from 'nookies';
import { CookiesName } from '@libs/values';
// eslint-disable-next-line import/no-cycle
import { getUpdatedToken } from '@libs/token';

const REISSUE_REQUEST_FLAG = 'reissue_token';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const test = (operation: Operation): boolean => {
  return !!operation.getContext()[REISSUE_REQUEST_FLAG];
};

const reissueAccessToken = setContext(async (_, prevContext) => {
  const cookies = parseCookies(prevContext);
  const refreshToken = cookies[CookiesName.refreshToken] || '';

  return {
    headers: {
      'A-TOKEN': getUpdatedToken(refreshToken),
    },
  };
});

const addAccessToken = setContext(async () => {
  const cookies = parseCookies();
  const accessToken = cookies[CookiesName.accessToken];

  return {
    headers: {
      'A-TOKEN': accessToken || '',
    },
  };
});

export const tokenHandler = onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors || networkError) {
      operation.setContext({
        [REISSUE_REQUEST_FLAG]: true,
      });
      return forward(operation);
    }
  },
).split(test, reissueAccessToken, addAccessToken);

export const serverSideClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  link: from([tokenHandler, httpLink]),
  cache: new InMemoryCache(),
});
