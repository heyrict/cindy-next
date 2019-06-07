import gql from 'graphql-tag';
import { PuzzleSharedFragment } from '../Fragments/Puzzles';

export const PuzzlesUnsolvedLiveQuery = gql`
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
  ${PuzzleSharedFragment}
`;
