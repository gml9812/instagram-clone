import { gql } from '@apollo/client';

export interface User {
  id: string | number;
  email: string;
  isMe: boolean;
  name: string;
  nickname: string;
  profileImage: string;
  quotes: string;
  postCount: number;
  posts: any;
}

// 유저 아이디는 1,2,3,4...
export const GET_USER = gql`
  query getUser($id: ID!, $postPaging: PostPagingInput) {
    getUser(id: $id, postPaging: $postPaging) {
      id
      email
      isMe
      name
      nickname
      profileImage
      quotes
      postCount
      posts {
        id
      }
    }
  }
`;
