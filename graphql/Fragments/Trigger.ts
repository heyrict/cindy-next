import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User.js';

export const USER_RANKING_TRIGGER_FRAGMENT = gql`
  fragment UserRankingTrigger on hasura_user_ranking_trigger {
    value
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
