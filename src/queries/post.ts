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

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
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
