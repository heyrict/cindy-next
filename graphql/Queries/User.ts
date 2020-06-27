import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { USER_AWARD_FRAGMENT } from '../Fragments/UserAward';

export const USER_BRIEF_QUERY = gql`
  query UserBriefQuery($id: Int!) {
    user_by_pk(id: $id) {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const USER_BRIEF_EXTRA_QUERY = gql`
  query UserBriefExtraQuery($id: Int!) {
    user_by_pk(id: $id) {
      id
      profile
      date_joined
      last_login
    }
  }
`;

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    user_by_pk(id: $id) {
      id
      profile
      ...UserBrief
      date_joined
      last_login
      hide_bookmark
      user_awards {
        ...UserAward
      }
      puzzles_aggregate {
        aggregate {
          count
        }
      }
      good_questions_aggregate: dialogues_aggregate(
        where: { good: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      true_answers_aggregate: dialogues_aggregate(
        where: { true: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      dialogues_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      stars_aggregate {
        aggregate {
          count
          sum {
            value
          }
        }
      }
    }
    received_comments_aggregate: comment_aggregate(
      where: { puzzle: { user_id: { _eq: $id } } }
    ) {
      aggregate {
        count
      }
    }
    received_stars_aggregate: star_aggregate(
      where: { puzzle: { user_id: { _eq: $id } } }
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
  ${USER_AWARD_FRAGMENT}
`;

export const USERAWARD_CHECKER_QUERY = gql`
  query UserawardCheckerQuery($userId: Int!) {
    user_by_pk(id: $userId) {
      id
      puzzles_aggregate {
        aggregate {
          count
        }
      }
      good_questions_aggregate: dialogues_aggregate(
        where: { good: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      true_answers_aggregate: dialogues_aggregate(
        where: { true: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      dialogues_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const USER_LIST_QUERY = gql`
  query UserListQuery($limit: Int, $offset: Int) {
    user(limit: $limit, offset: $offset, order_by: { id: desc }) {
      id
      ...UserBrief
      profile
      date_joined
      last_login
    }
    user_aggregate {
      aggregate {
        count
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const USER_LAST_READ_DM_QUERY = gql`
  query UserLastReadDmQuery($id: Int!) {
    user_by_pk(id: $id) {
      id
      last_read_dm_id
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
