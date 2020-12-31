import gql from 'graphql-tag';

export const PUZZLE_LOG_SUB = gql`
  subscription PuzzleLogSub($puzzleId: Int!) {
    puzzleLogSub(filter: { puzzleId: { eq: $puzzleId } }) {
      id
      modified
    }
  }
`;

export const PUZZLE_LOG_WITH_USER_SUB = gql`
  subscription PuzzleLogWithUserSub($puzzleId: Int!, $userId: Int!) {
    puzzleLogSub(
      filter: { puzzleId: { eq: $puzzleId }, userId: { eq: $userId } }
    ) {
      id
      modified
    }
  }
`;
