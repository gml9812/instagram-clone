import { gql } from '@apollo/client';
import { User } from './auth';

export interface Media {
  id: number;
  url: string;
  width: number;
  height: number;
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
  modifiedAt: string;
}

export const DEFAULT_POST_SIZE = 10;

export const GET_POSTS = gql`
  query getPosts($postPaging: PostPagingInput) {
    getPosts(postPaging: $postPaging) {
      id
      user {
        id
        nickname
        profileImage
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
      modifiedAt
    }
  }
`;

export const DEFAULT_COMMENT_SIZE = 10;
export const DEFAULT_SUBCOMMENT_SIZE = 3;

export interface Comment {
  id: number;
  user: User;
  description: string;
  createdAt: string;
  isLike: boolean;
  isMine: boolean;
  subCommentCount: number;
}

export interface PostWithComment extends Post {
  comments: Comment[];
}

export const GET_POST = gql`
  query getPost($id: ID!, $commentPaging: CommentPagingInput!) {
    getPost(id: $id, commentPaging: $commentPaging) {
      id
      user {
        id
        nickname
        profileImage
      }
      description
      modifiedAt
      commentCount
      comments {
        id
        user {
          id
          nickname
          profileImage
        }
        description
        subCommentCount
        isLike
        isMine
        createdAt
      }
    }
  }
`;

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
      isMine
      createdAt
    }
  }
`;

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
