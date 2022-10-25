import { gql } from '@apollo/client';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
