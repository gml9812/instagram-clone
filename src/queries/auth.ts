import { gql } from '@apollo/client';

export interface User {
  id: number;
  nickname: string;
  profileImage: string;
}

interface UserInfoWithToken {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginUser {
  login: UserInfoWithToken;
}

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        nickname
        profileImage
      }
    }
  }
`;

export const REFRESH_ATOKEN_MUTATION = gql`
  mutation getATokenByRToken {
    getATokenByRToken
  }
`;
