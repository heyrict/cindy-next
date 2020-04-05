import gql from 'graphql-tag';

import { REPLAY_SHARED_FRAGMENT } from '../Fragments/Replay';
import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const REPLAY_QUERY = gql`
  query ReplayQuery($id: Int!) {
    sui_hei_replay_by_pk(id: $id) {
      id
      ...ReplayShared
      milestones
      sui_hei_replay_dialogues {
        id
        question
        answer
        good
        true
        keywords
        milestones
        dependency
      }
      sui_hei_puzzle {
        id
        title
        content
        solution
        sui_hei_user {
          ...UserBrief
        }
      }
    }
  }
  ${REPLAY_SHARED_FRAGMENT}
  ${USER_BRIEF_FRAGMENT}
`;

export const REPLAY_LIST_QUERY = gql`
  query ReplayListQuery($limit: Int, $offset: Int) {
    sui_hei_replay(order_by: { id: desc }, limit: $limit, offset: $offset)
      @connection(key: "sui_hei_replay", filter: ["order_by"]) {
      id
      ...ReplayShared
      milestones
    }
    sui_hei_replay_aggregate {
      aggregate {
        count
      }
    }
  }
  ${REPLAY_SHARED_FRAGMENT}
`;
