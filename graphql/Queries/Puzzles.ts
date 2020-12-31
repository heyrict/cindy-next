import gql from 'graphql-tag';

import {
  PUZZLE_SHARED_FRAGMENT,
  PUZZLE_AGGREGATE_FRAGMENT,
} from '../Fragments/Puzzles';

export const PUZZLE_QUERY = gql`
  query PuzzleQuery($id: Int!) {
    puzzle(id: $id) {
      ...PuzzleShared
      dazedOn
      content
      memo
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_SOLUTION_QUERY = gql`
  query PuzzleSolutionQuery($id: Int!) {
    puzzle(id: $id) {
      id
      solution
    }
  }
`;

/*
export const PUZZLE_REPLAY_INFO_QUERY = gql`
  query PuzzleReplayInfoQuery($id: Int!) {
    puzzle(id: $id) {
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
*/

export const PUZZLES_UNSOLVED_QUERY = gql`
  query PuzzlesUnsolvedQuery {
    puzzles(order: { modified: DESC }, filter: { status: { eq: UNDERGOING } }) {
      ...PuzzleShared
      dialogueCount
      dialogueNewCount: dialogueCount(answered: false)
      dialogueMaxAnsweredTime
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLES_SOLVED_QUERY = gql`
  query PuzzlesSolvedQuery($limit: Int, $offset: Int) {
    puzzles(
      order: { modified: DESC }
      filter: { status: { neAll: [UNDERGOING, FORCEHIDDEN] } }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzles", filter: ["order", "filter"]) {
      ...PuzzleShared
      starCount
      starSum
      commentCount
      bookmarkCount
      dialogueCount
      dialogueNewCount: dialogueCount(answered: false)
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_UNIQUE_PARTICIPANTS_QUERY = gql`
  query PuzzleUniqueParticipantsQuery($puzzleId: Int!) {
    puzzleParticipants(puzzleId: $puzzleId) {
      id
      nickname
      trueAnswer
      dialogueCount
      answeredDialogueCount
    }
  }
`;

export const SOLVED_PUZZLES_SEARCH_QUERY = gql`
  query SolvedPuzzlesSearchQuery(
    $limit: Int
    $offset: Int
    $title: String
    $content: String
    $solution: String
    $genre: Genre
    $yami: Yami
    $orderBy: [PuzzleOrder!]
  ) {
    puzzles(
      order: $orderBy
      filter: {
        status: { ne: UNDERGOING }
        title: { like: $title }
        content: { like: $content }
        solution: { like: $solution }
        genre: { eq: $genre }
        yami: { eq: $yami }
      }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzles", filter: ["order", "filter"]) {
      ...PuzzleAggregate
    }
    puzzleCount(
      filter: {
        status: { ne: UNDERGOING }
        title: { like: $title }
        content: { like: $content }
        solution: { like: $solution }
        genre: { eq: $genre }
        yami: { eq: $yami }
      }
    )
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const TAG_PUZZLES_QUERY = gql`
  query TagPuzzlesQuery(
    $limit: Int
    $offset: Int
    $tagId: Int!
    $orderBy: [PuzzleTagOrder!]
  ) {
    puzzleTags(
      order: $orderBy
      filter: { tagId: { eq: $tagId } }
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzleTags", filter: ["order", "filter"]) {
      puzzle {
        ...PuzzleAggregate
      }
    }
    puzzleTagCount(filter: { tagId: { eq: $tagId } })
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PROFILE_PUZZLES_QUERY = gql`
  query ProfilePuzzlesQuery(
    $limit: Int
    $offset: Int
    $userId: Int
    $orderBy: [PuzzleOrder!]
  ) {
    puzzles(
      filter: [
        { anonymous: true, status: { ne: UNDERGOING }, userId: { eq: $userId } }
        { anonymous: false, userId: { eq: $userId } }
      ]
      order: $orderBy
      limit: $limit
      offset: $offset
    ) @connection(key: "puzzle", filter: ["order", "filter"]) {
      ...PuzzleAggregate
    }
    puzzleCount(
      filter: [
        { anonymous: true, status: { ne: UNDERGOING }, userId: { eq: $userId } }
        { anonymous: false, userId: { eq: $userId } }
      ]
    )
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PROFILE_FOOTPRINTS_QUERY = gql`
  query ProfileFootprintsQuery($limit: Int!, $offset: Int!, $userId: Int!) {
    puzzleFootprints(userId: $userId, limit: $limit, offset: $offset)
      @connection(key: "puzzleFootprints", filter: ["userId"]) {
      ...PuzzleAggregate
    }
    puzzleFootprintCount(userId: $userId)
  }
  ${PUZZLE_AGGREGATE_FRAGMENT}
`;

export const PUZZLE_JUMP_BUTTONS_QUERY = gql`
  query PuzzleJumpButtonsQuery($puzzleId: Int!) {
    prev_puzzle: puzzles(
      filter: {
        status: { eqAny: [UNDERGOING, SOLVED, DAZED] }
        id: { lt: $puzzleId }
      }
      order: { id: DESC }
      limit: 1
    ) {
      ...PuzzleShared
    }
    next_puzzle: puzzles(
      filter: {
        status: { eqAny: [UNDERGOING, SOLVED, DAZED] }
        id: { gt: $puzzleId }
      }
      order: { id: ASC }
      limit: 1
    ) {
      ...PuzzleShared
    }
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;
