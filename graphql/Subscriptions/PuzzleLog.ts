import { gql } from '@apollo/client';

export const PUZZLE_LOG_SUB = gql`
  subscription PuzzleLogSub($puzzleId: Int!) {
    puzzleLogSub(filter: { puzzleId: $puzzleId }) {
      data {
        id
        modified
      }
    }
  }
`;

export const PUZZLE_LOG_WITH_USER_SUB = gql`
  subscription PuzzleLogWithUserSub($puzzleId: Int!, $userId: Int!) {
    puzzleLogSub(
      filter: { puzzleId: $puzzleId, userId: $userId }
    ) {
      data {
        id
        modified
      }
    }
  }
`;
