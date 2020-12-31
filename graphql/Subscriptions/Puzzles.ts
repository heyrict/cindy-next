import gql from 'graphql-tag';

export const PUZZLES_UNSOLVED_SUB = gql`
  subscription PuzzlesUnsolvedSub {
    puzzleSub(filter: { status: { eq: 0 } }) {
      id
      modified
    }
  }
`;

export const PUZZLE_SUB = gql`
  subscription PuzzleSub($id: Int!) {
    puzzleSub(id: $id) {
      id
      status
      yami
      anonymous
      modified
      memo
    }
  }
`;
