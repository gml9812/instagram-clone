import { gql } from '@apollo/client';
import { User } from './auth';

export const CREATE_LIKE = gql`
  mutation createLike($likeInput: LikeInput!) {
    createLike(likeInput: $likeInput)
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($likeInput: LikeInput!) {
    deleteLike(likeInput: $likeInput)
  }
`;

export const DEFAULT_LIKE_MEMBER_SIZE = 10;

interface LikeMember extends User {
  name: string;
}

export interface LikeItem {
  id: number;
  user: LikeMember;
  createdAt: string;
}

export const GET_LIKES = gql`
  query getLikes($likeInput: LikeInput!, $pagingInput: PagingInput!) {
    getLikes(likeInput: $likeInput, pagingInput: $pagingInput) {
      id
      user {
        id
        name
        nickname
        profileImage
      }
      createdAt
    }
  }
`;
