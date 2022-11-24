import { gql } from '@apollo/client';
import { User } from './auth';
import { Post } from './post';

export const DEFAULT_COMMENT_SIZE = 10;
export const DEFAULT_SUBCOMMENT_SIZE = 3;

export interface Comment {
  id: number;
  user: User;
  description: string;
  createdAt: string;
  isLike: boolean;
  isMine: boolean;
  likeCount: number;
  subCommentCount: number;
}

export interface PostWithComment extends Post {
  comments: Comment[];
}

export interface NewSubComment extends Comment {
  parentId: number;
}

export const GET_COMMENTS = gql`
  query getSubComments($id: ID!, $commentPaging: CommentPagingInput!) {
    getSubComments(id: $id, commentPaging: $commentPaging) {
      id
      user {
        id
        nickname
        profileImage
      }
      description
      isLike
      likeCount
      isMine
      createdAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $description: String!) {
    createComment(postId: $postId, description: $description) {
      id
      user {
        id
        nickname
        profileImage
      }
      description
      isLike
      likeCount
      isMine
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;

export const CREATE_SUBCOMMENT = gql`
  mutation createSubComment(
    $postId: ID!
    $parentId: ID!
    $description: String!
  ) {
    createSubComment(
      postId: $postId
      parentId: $parentId
      description: $description
    ) {
      id
      user {
        id
        nickname
        profileImage
      }
      description
      isLike
      likeCount
      isMine
      createdAt
    }
  }
`;
