import gql from 'graphql-tag';
import { PUZZLE_SHARED_FRAGMENT } from '../Fragments/Puzzles';

export const PUZZLES_UNSOLVED_LIVEQUERY = gql`
  subscription PuzzlesUnsolvedLiveQuery {
    sui_hei_puzzle(
      order_by: { modified: desc }
      where: { status: { _eq: 0 } }
    ) {
      ...PuzzleShared
      sui_hei_dialogues_aggregate {
        aggregate {
          count
          max {
            answeredtime
          }
        }
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_LIVEQUERY = gql`
  subscription PuzzleLiveQuery($id: Int!) {
    sui_hei_puzzle_by_pk(id: $id) {
      id
      status
      yami
      anonymous
      modified
      solution
      memo
    }
  }
`;
