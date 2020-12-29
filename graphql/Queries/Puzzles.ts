import gql from 'graphql-tag';

import {
  PUZZLE_SHARED_FRAGMENT,
  PUZZLE_AGGREGATE_FRAGMENT,
} from '../Fragments/Puzzles';
import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const PUZZLE_QUERY = gql`
  query PuzzleQuery($id: Int!) {
    puzzle_by_pk(id: $id) {
      ...PuzzleShared
      dazed_on
      content
      memo
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_SOLUTION_QUERY = gql`
  query PuzzleSolutionQuery($id: Int!) {
    puzzle_by_pk(id: $id) {
      id
      solution
    }
  }
`;

export const PUZZLE_REPLAY_INFO_QUERY = gql`
  query PuzzleReplayInfoQuery($id: Int!) {
    puzzle_by_pk(id: $id) {
      id
      ...PuzzleShared
      content
      solution
      dialogues(order_by: { id: asc }) {
        ...DialogueShared
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
  ${DIALOGUE_SHARED_FRAGMENT}
`;

export const PUZZLE_DIALOGUE_QUERY = gql`
  query PuzzleDialogueQuery($id: Int!) {
    dialogue(where: { puzzle: { id: { _eq: $id } } }, order_by: { id: asc }) {
      ...DialogueShared
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;

export const PUZZLES_UNSOLVED_QUERY = gql`
  query PuzzlesUnsolvedQuery {
    puzzle(order_by: { modified: desc }, where: { status: { _eq: 0 } }) {
      ...PuzzleShared
      dialogues_aggregate {
        aggregate {
          count
          max {
            answeredtime
            created
          }
        }
      }
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLES_SOLVED_QUERY = gql`
  query PuzzlesSolvedQuery($limit: Int, $offset: Int) {
    puzzle(
      order_by: { modified: desc }
      where: { status: { _gt: 0, _lt: 4 } }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzle", filter: ["order_by", "where"]) {
      ...PuzzleShared
      stars_aggregate {
        aggregate {
          count
          sum {
            value
          }
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      bookmarks_aggregate {
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
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_UNIQUE_PARTICIPANTS_QUERY = gql`
  query PuzzleUniqueParticipantsQuery($puzzleId: Int, $dialogueTrue: Boolean) {
    user(
      where: {
        dialogues: {
          puzzle_id: { _eq: $puzzleId }
          true: { _eq: $dialogueTrue }
        }
      }
    ) {
      id
      nickname
      dialogues_aggregate(where: { puzzle_id: { _eq: $puzzleId } }) {
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
    $orderBy: [puzzle_order_by!]
  ) {
    puzzle(
      order_by: $orderBy
      where: {
        status: { _neq: 0 }
        title: { _like: $title }
        content: { _like: $content }
        solution: { _like: $solution }
        genre: { _eq: $genre }
        yami: { _eq: $yami }
        user: { nickname: { _like: $userNickname } }
      }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
    }
    puzzle_aggregate(
      where: {
        status: { _neq: 0 }
        title: { _like: $title }
        content: { _like: $content }
        solution: { _like: $solution }
        genre: { _eq: $genre }
        yami: { _eq: $yami }
        user: { nickname: { _like: $userNickname } }
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
    $orderBy: [puzzle_order_by!]
  ) {
    puzzle(
      order_by: $orderBy
      where: { puzzle_tags: { tag_id: { _eq: $tagId } } }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
    }
    puzzle_aggregate(where: { puzzle_tags: { tag_id: { _eq: $tagId } } }) {
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
    $orderBy: [puzzle_order_by!]
  ) {
    puzzle(
      order_by: $orderBy
      where: {
        user_id: { _eq: $userId }
        _or: [
          { anonymous: { _eq: true }, status: { _neq: 0 } }
          { anonymous: { _eq: false } }
        ]
      }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzle", filter: ["order_by", "where"]) {
      ...PuzzleAggregate
    }
    puzzle_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PROFILE_FOOTPRINTS_QUERY = gql`
  query ProfileFootprintsQuery($limit: Int, $offset: Int, $userId: Int) {
    puzzle(
      order_by: { modified: desc }
      where: { dialogues: { user_id: { _eq: $userId } } }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzle", filter: ["where"]) {
      ...PuzzleAggregate
    }
    puzzle_aggregate(where: { dialogues: { user_id: { _eq: $userId } } }) {
      aggregate {
        count
      }
    }
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const YAMI_PUZZLE_COUNT_QUERY = gql`
  query YamiPuzzleCountQuery($userId: Int!) {
    puzzle(
      where: { yami: { _neq: 0 }, user_id: { _eq: $userId } }
      order_by: { dialogues_aggregate: { count: desc } }
      limit: 1
    ) {
      dialogues_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const PUZZLE_JUMP_BUTTONS_QUERY = gql`
  query PuzzleJumpButtonsQuery($puzzleId: Int!) {
    prev_puzzle: puzzle(
      where: { status: { _lte: 2 }, id: { _lt: $puzzleId } }
      order_by: { id: desc }
      limit: 1
    ) {
      ...PuzzleShared
    }
    next_puzzle: puzzle(
      where: { status: { _lte: 2 }, id: { _gt: $puzzleId } }
      order_by: { id: asc }
      limit: 1
    ) {
      ...PuzzleShared
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;
