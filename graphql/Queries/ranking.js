import gql from 'graphql-tag';

import { USER_RANKING_TRIGGER_FRAGMENT } from '../Fragments/Trigger';

export const STAR_COUNT_RANKING_QUERY = gql`
  query StarCountRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamp!
    $createdGte: timestamp!
  ) {
    star_count_ranking(
      limit: $limit
      offset: $offset
      args: { created_lt: $createdLt, created_gte: $createdGte }
    ) {
      ...UserRankingTrigger
    }
  }
  ${USER_RANKING_TRIGGER_FRAGMENT}
`;

export const StarSumRankingQuery = gql`
  query StarSumRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamp!
    $createdGte: timestamp!
  ) {
    star_sum_ranking(
      limit: $limit
      offset: $offset
      args: { created_lt: $createdLt, created_gte: $createdGte }
    ) {
      ...UserRankingTrigger
    }
  }
  ${USER_RANKING_TRIGGER_FRAGMENT}
`;
