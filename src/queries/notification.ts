import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query getNotifications {
    getNotifications {
      id
      receiver {
        id
        name
        nickname
        profileImage
      }
      content
      createdAt
      modifiedAt
    }
  }
`;
