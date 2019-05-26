import gql from 'graphql-tag';

import { UserBriefFragment } from '../Fragments/User.js';

export const UserRankingTriggerFragment = gql`
  fragment UserRankingTrigger on hasura_user_ranking_trigger {
    value
    sui_hei_user {
      ...UserBrief
    }
  }
`;
