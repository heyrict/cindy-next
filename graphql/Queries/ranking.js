import gql from 'graphql-tag';

import { UserRankingTriggerFragment } from '../Fragments/Trigger';

export const StarCountRankingQuery = gql`
  query StarCountRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamp!
    $createdGt: timestamp!
  ) {
    star_count_ranking(
      limit: $limit
      offset: $offset
      args: { created_lt: $createdLt, created_gt: $createdGt }
    ) {
      ...UserRankingTrigger
    }
  }
  ${UserRankingTriggerFragment}
`;

export const StarSumRankingQuery = gql`
  query StarSumRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamp!
    $createdGt: timestamp!
  ) {
    star_sum_ranking(
      limit: $limit
      offset: $offset
      args: { created_lt: $createdLt, created_gt: $createdGt }
    ) {
      ...UserRankingTrigger
    }
  }
  ${UserRankingTriggerFragment}
`;
