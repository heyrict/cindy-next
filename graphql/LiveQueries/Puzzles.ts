import gql from 'graphql-tag';
import { PUZZLE_SHARED_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLES_UNSOLVED_LIVEQUERY = gql`
  subscription PuzzlesUnsolvedLiveQuery {
    puzzle(order_by: { modified: desc }, where: { status: { _eq: 0 } }) {
      ...PuzzleShared
      dialogues_aggregate {
        aggregate {
          count
          max {
            answeredtime
            created
          }
        }
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_LIVEQUERY = gql`
  subscription PuzzleLiveQuery($id: Int!) {
    puzzle_by_pk(id: $id) {
      id
      status
      yami
      anonymous
      modified
      memo
    }
  }
`;
