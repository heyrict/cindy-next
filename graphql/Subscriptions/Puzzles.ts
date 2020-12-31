import gql from 'graphql-tag';

export const PUZZLES_UNSOLVED_SUB = gql`
  subscription PuzzlesUnsolvedSub {
    puzzleSub(filter: { status: { eq: UNDERGOING } }) {
      data {
        id
        modified
      }
    }
  }
`;

export const PUZZLE_SUB = gql`
  subscription PuzzleSub($id: Int!) {
    puzzleSub(filter: { id: { eq: $id }}) {
      data {
        id
        status
        yami
        anonymous
        modified
        memo
      }
    }
  }
`;
