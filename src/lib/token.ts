import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
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
