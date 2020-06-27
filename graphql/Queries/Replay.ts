import gql from 'graphql-tag';

import { REPLAY_SHARED_FRAGMENT } from '../Fragments/Replay';
import { PUZZLE_SHARED_FRAGMENT } from 'graphql/Fragments/Puzzles';

export const REPLAY_QUERY = gql`
  query ReplayQuery($id: Int!) {
    replay_by_pk(id: $id) {
      id
      ...ReplayShared
      milestones
      replay_dialogues {
        id
        question
        answer
        good
        true
        keywords
        milestones
        dependency
      }
      puzzle {
        id
        content
        solution
        ...PuzzleShared
      }
    }
  }
  ${REPLAY_SHARED_FRAGMENT}
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const REPLAY_LIST_QUERY = gql`
  query ReplayListQuery($limit: Int, $offset: Int) {
    replay(order_by: { id: desc }, limit: $limit, offset: $offset)
      @connection(key: "replay", filter: ["order_by"]) {
      id
      ...ReplayShared
      milestones
    }
    replay_aggregate {
      aggregate {
        count
      }
    }
  }
  ${REPLAY_SHARED_FRAGMENT}
`;
