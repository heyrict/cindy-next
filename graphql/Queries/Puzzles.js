import gql from 'graphql-tag';

import { PuzzleSharedFragment } from '../Fragments/Puzzles';
import { DialogueSharedFragment } from '../Fragments/Dialogue';

export const PuzzleQuery = gql`
  query PuzzleQuery($id: Int!) {
    sui_hei_puzzle_by_pk(pk: $id) {
      ...PuzzleShared
      content
      solution
      memo
    }
  }
`;

export const PuzzleDialogueQuery = gql`
  query PuzzleDialogueQuery($id: Int!) {
    sui_hei_dialogue(
      where: { sui_hei_puzzle: { id: { _eq: $id } } }
      order_by: { id: desc }
    ) {
      ...DialogueShared
    }
  }
  ${DialogueSharedFragment}
`;

export const PuzzlesUnsolvedQuery = gql`
  query PuzzlesUnsolvedQuery {
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

export const PuzzleSolvedQuery = gql`
  query PuzzlesSolvedQuery($limit: Int, $offset: Int) {
    sui_hei_puzzle(
      order_by: { modified: desc }
      where: { status: { _neq: 0 } }
      limit: $limit
      offset: $offset
    ) {
      ...PuzzleShared
      sui_hei_stars_aggregate {
        aggregate {
          count
          sum {
            value
          }
        }
      }
      sui_hei_comments_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_bookmarks_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_dialogues_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${PuzzleSharedFragment}
`;
