import { gql } from '@apollo/client';

export const ONLINE_USERS_QUERY = gql`
  query OnlineUsersQuery {
    onlineUsersCount
  }
`;
