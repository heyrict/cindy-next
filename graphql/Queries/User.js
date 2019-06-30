import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { USERAWARD_FRAGMENT } from '../Fragments/UserAward';

export const USER_BRIEF_QUERY = gql`
  query UserBriefQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      id
      profile
      ...UserBrief
      sui_hei_userawards {
        ...UserAward
      }
      sui_hei_puzzles_aggregate {
        aggregate {
          count
        }
      }
      good_questions_aggregate: sui_hei_dialogues_aggregate(
        where: { good: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      true_answers_aggregate: sui_hei_dialogues_aggregate(
        where: { true: { _eq: true } }
      ) {
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
      sui_hei_stars_aggregate {
        aggregate {
          count
          sum {
            value
          }
        }
      }
    }
    received_comments_aggregate: sui_hei_comment_aggregate(
      where: { sui_hei_puzzle: { user_id: { _eq: $id } } }
    ) {
      aggregate {
        count
      }
    }
    received_stars_aggregate: sui_hei_star_aggregate(
      where: { sui_hei_puzzle: { user_id: { _eq: $id } } }
    ) {
      aggregate {
        count
        sum {
          value
        }
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
  ${USERAWARD_FRAGMENT}
`;

export const USERAWARD_CHECKER_QUERY = gql`
  query UserawardCheckerQuery($userId: Int!) {
    sui_hei_user_by_pk(id: $userId) {
      id
      sui_hei_puzzles_aggregate {
        aggregate {
          count
        }
      }
      good_questions_aggregate: sui_hei_dialogues_aggregate(
        where: { good: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      true_answers_aggregate: sui_hei_dialogues_aggregate(
        where: { true: { _eq: true } }
      ) {
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
`;
