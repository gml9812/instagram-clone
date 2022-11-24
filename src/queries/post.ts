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
  createdAt: string;
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
      isMine
      createdAt
    }
  }
`;

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
      createdAt
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
        likeCount
        isMine
        createdAt
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($post: PostInput) {
    createPost(post: $post) {
      id
      user {
        id
        nickname
        name
      }
      description
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($updatePost: UpdatePostInput) {
    updatePost(updatePost: $updatePost) {
      id
      description
      medias {
        url
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
