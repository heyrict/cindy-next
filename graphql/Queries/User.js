import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const USER_BRIEF_QUERY = gql`
  query UserBriefQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const UserQuery = gql`
  query UserQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      id
      profile
      ...UserBrief
      sui_hei_puzzles_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_dialogues_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
