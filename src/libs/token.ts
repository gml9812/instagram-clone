import { serverSideClient } from '@apollo/apolloClient';
import { REFRESH_ATOKEN_MUTATION } from '@queries/auth';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { CookiesName } from './values';

export const getAccessToken = (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context);
  const accessToken = cookies[CookiesName.accessToken] || '';
  return accessToken;
};

export const getRefreshToken = (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context);
  const refreshToken = cookies[CookiesName.refreshToken] || '';
  return refreshToken;
};

export const setAccessToken = (token: string) => {
  setCookie(null, CookiesName.accessToken, token, {
    maxAge: 60 * 60,
    path: '/',
  });
};

export const setRefreshToken = (token: string) => {
  setCookie(null, CookiesName.refreshToken, token, {
    maxAge: 60 * 60 * 24 * 15,
    path: '/',
  });
};

export const getUpdatedToken = async (refreshToken: string) => {
  const { data } = await serverSideClient.mutate({
    mutation: REFRESH_ATOKEN_MUTATION,
    context: {
      headers: {
        'R-TOKEN': refreshToken,
      },
    },
  });
  return data.getATokenByRToken || '';
};
