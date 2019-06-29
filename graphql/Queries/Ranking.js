import gql from 'graphql-tag';

import { USER_RANKING_TRIGGER_FRAGMENT } from '../Fragments/Trigger';
import { PUZZLE_AGGREGATE_FRAGMENT } from '../Fragments/Puzzles';

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
      order_by: [{ value: desc_nulls_last }, { user_id: asc }]
    ) {
      ...UserRankingTrigger
    }
  }
  ${USER_RANKING_TRIGGER_FRAGMENT}
`;

export const STAR_SUM_RANKING_QUERY = gql`
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
      order_by: [{ value: desc_nulls_last }, { user_id: asc }]
    ) {
      ...UserRankingTrigger
    }
  }
  ${USER_RANKING_TRIGGER_FRAGMENT}
`;

export const USER_DIALOGUE_RANKING_QUERY = gql`
  query UserDialogueRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamp!
    $createdGte: timestamp!
  ) {
    dialogue_count_ranking(
      limit: $limit
      offset: $offset
      args: { created_lt: $createdLt, created_gte: $createdGte }
      order_by: [{ value: desc_nulls_last }, { user_id: asc }]
    ) {
      ...UserRankingTrigger
    }
  }
  ${USER_RANKING_TRIGGER_FRAGMENT}
`;

export const USER_PUZZLE_RANKING_QUERY = gql`
  query UserPuzzleRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamp!
    $createdGte: timestamp!
  ) {
    puzzle_count_ranking(
      limit: $limit
      offset: $offset
      args: { created_lt: $createdLt, created_gte: $createdGte }
      order_by: [{ value: desc_nulls_last }, { user_id: asc }]
    ) {
      ...UserRankingTrigger
    }
  }
  ${USER_RANKING_TRIGGER_FRAGMENT}
`;

export const PUZZLE_STAR_RANKING_QUERY = gql`
  query PuzzleStarRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamptz!
    $createdGte: timestamptz!
  ) {
    sui_hei_puzzle(
      order_by: [
        { sui_hei_stars_aggregate: { count: desc } }
        { sui_hei_stars_aggregate: { sum: { value: desc } } }
        { id: asc }
      ]
      limit: $limit
      offset: $offset
      where: { created: { _gte: $createdGte, _lt: $createdLt } }
    ) @connection(key: "sui_hei_puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
      content
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PUZZLE_COMMENT_RANKING_QUERY = gql`
  query PuzzleCommentRankingQuery(
    $limit: Int
    $offset: Int
    $createdLt: timestamptz!
    $createdGte: timestamptz!
  ) {
    sui_hei_puzzle(
      order_by: [{ sui_hei_comments_aggregate: { count: desc } }, { id: asc }]
      limit: $limit
      offset: $offset
      where: { created: { _gte: $createdGte, _lt: $createdLt } }
    ) @connection(key: "sui_hei_puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
      content
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;
