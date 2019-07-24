import gql from 'graphql-tag';

import {
  PUZZLE_SHARED_FRAGMENT,
  PUZZLE_AGGREGATE_FRAGMENT,
} from '../Fragments/Puzzles';
import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const PUZZLE_QUERY = gql`
  query PuzzleQuery($id: Int!) {
    sui_hei_puzzle_by_pk(id: $id) {
      ...PuzzleShared
      dazed_on
      content
      solution
      memo
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_DIALOGUE_QUERY = gql`
  query PuzzleDialogueQuery($id: Int!) {
    sui_hei_dialogue(
      where: { sui_hei_puzzle: { id: { _eq: $id } } }
      order_by: { id: desc }
    ) {
      ...DialogueShared
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;

export const PUZZLES_UNSOLVED_QUERY = gql`
  query PuzzlesUnsolvedQuery {
    sui_hei_puzzle(
      order_by: { modified: desc }
      where: { status: { _eq: 0 } }
    ) {
      ...PuzzleShared
      sui_hei_dialogues_aggregate {
        aggregate {
          count
          max {
            answeredtime
          }
        }
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLES_SOLVED_QUERY = gql`
  query PuzzlesSolvedQuery($limit: Int, $offset: Int) {
    sui_hei_puzzle(
      order_by: { modified: desc }
      where: { status: { _neq: 0 } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_puzzle", filter: ["order_by", "where"]) {
      ...PuzzleShared
      sui_hei_stars_aggregate {
        aggregate {
          count
          sum {
            value
          }
        }
      }
      sui_hei_comments_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_bookmarks_aggregate {
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
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_UNIQUE_PARTICIPANTS_QUERY = gql`
  query PuzzleUniqueParticipantsQuery($puzzleId: Int, $dialogueTrue: Boolean) {
    sui_hei_user(
      where: {
        sui_hei_dialogues: {
          puzzle_id: { _eq: $puzzleId }
          true: { _eq: $dialogueTrue }
        }
      }
    ) {
      id
      nickname
      sui_hei_dialogues_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
        aggregate {
          count
        }
      }
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const SOLVED_PUZZLES_SEARCH_QUERY = gql`
  query SolvedPuzzlesSearchQuery(
    $limit: Int
    $offset: Int
    $title: String
    $content: String
    $solution: String
    $genre: Int
    $yami: Int
    $userNickname: String
    $tags: [Int]
    $orderBy: [sui_hei_puzzle_order_by!]
  ) {
    sui_hei_puzzle(
      order_by: $orderBy
      where: {
        status: { _neq: 0 }
        title: { _like: $title }
        content: { _like: $content }
        solution: { _like: $solution }
        genre: { _eq: $genre }
        yami: { _eq: $yami }
        sui_hei_user: { nickname: { _like: $userNickname } }
        sui_hei_puzzle_tags: { tag_id: { _in: $tags } }
      }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
    }
    sui_hei_puzzle_aggregate(
      order_by: $orderBy
      where: {
        status: { _neq: 0 }
        title: { _like: $title }
        content: { _like: $content }
        solution: { _like: $solution }
        genre: { _eq: $genre }
        yami: { _eq: $yami }
        sui_hei_user: { nickname: { _like: $userNickname } }
        sui_hei_puzzle_tags: { tag_id: { _in: $tags } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const TAG_PUZZLES_QUERY = gql`
  query TagPuzzlesQuery(
    $limit: Int
    $offset: Int
    $tagId: Int!
    $orderBy: [sui_hei_puzzle_order_by!]
  ) {
    sui_hei_puzzle(
      order_by: $orderBy
      where: { sui_hei_puzzle_tags: { tag_id: { _eq: $tagId } } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
    }
    sui_hei_puzzle_aggregate(
      order_by: $orderBy
      where: { sui_hei_puzzle_tags: { tag_id: { _eq: $tagId } } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PROFILE_PUZZLES_QUERY = gql`
  query ProfilePuzzlesQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [sui_hei_puzzle_order_by!]
  ) {
    sui_hei_puzzle(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
    }
    sui_hei_puzzle_aggregate(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PROFILE_STARS_QUERY = gql`
  query ProfileStarsQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [sui_hei_star_order_by!]
  ) {
    sui_hei_star(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_star", filter: ["order_by", "where"]) {
      id
      value
      sui_hei_puzzle {
        ...PuzzleAggregate
      }
    }
    sui_hei_star_aggregate(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PROFILE_BOOKMARKS_QUERY = gql`
  query ProfileBookmarksQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [sui_hei_bookmark_order_by!]
  ) {
    sui_hei_bookmark(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "sui_hei_bookmark", filter: ["order_by", "where"]) {
      id
      value
      sui_hei_puzzle {
        ...PuzzleAggregate
      }
    }
    sui_hei_bookmark_aggregate(
      order_by: $orderBy
      where: { user_id: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const YAMI_PUZZLE_COUNT_QUERY = gql`
  query YamiPuzzleCountQuery($userId: Int!) {
    sui_hei_puzzle(
      where: { yami: { _neq: 0 }, user_id: { _eq: $userId } }
      order_by: { sui_hei_dialogues_aggregate: { count: desc } }
      limit: 1
    ) {
      sui_hei_dialogues_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
