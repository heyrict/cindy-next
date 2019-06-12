import gql from 'graphql-tag';

import { UserBriefFragment } from './User';

export const UserBriefQuery = gql`
  query UserBriefQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      ...UserBrief
    }
  }
  ${UserBriefFragment}
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
  ${UserBriefFragment}
`;
