import { gql } from '@apollo/client';

export const ONLINE_USERS_QUERY = gql`
  query OnlineUsersQuery {
    onlineUsersCount
  }
`;

export const PUZZLE_ONLINE_USERS_QUERY = gql`
  query PuzzleOnlineUsersQuery($puzzleId: Int!) {
    puzzleOnlineUsersCount(puzzleId: $puzzleId)
  }
`;
