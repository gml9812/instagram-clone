import { gql } from '@apollo/client';

export interface Media {
  id: number;
  url: string;
  width: number;
  height: number;
}

export interface User {
  id: number;
  nickname: string;
}

export interface Post {
  id: number;
  user: User;
  description: string;
  medias: Media[];
  likeCount: number;
  commentCount: number;
  isLike: boolean;
  isMine: boolean;
  lastModifiedAt: string;
}

export const DEFAULT_POST_SIZE = 10;

export const GET_POSTS = gql`
  query GetPosts($lastId: Int, $size: Int!) {
    getPosts(postPaging: { lastId: $lastId, size: $size }) {
      id
      user {
        id
        nickname
      }
      description
      medias {
        id
        url
        width
        height
      }
      likeCount
      commentCount
      isLike
      lastModifiedAt
    }
  }
`;
