import { gql } from '@apollo/client';

import { USER_BRIEF_FRAGMENT } from './User';

export const PUZZLE_SHARED_FRAGMENT = gql`
  fragment PuzzleShared on Puzzle {
    id
    genre
    title
    status
    yami
    anonymous
    created
    modified
    grotesque
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const PUZZLE_AGGREGATE_FRAGMENT = gql`
  fragment PuzzleAggregate on Puzzle {
    ...PuzzleShared
    starCount
    starSum
    commentCount
    bookmarkCount
    dialogueCount
  }
  ${PUZZLE_SHARED_FRAGMENT}
`;

export const PUZZLE_UNSOLVED_EXTRA_FRAGMENT = gql`
  fragment PuzzleUnsolvedExtra on Puzzle {
    dialogueCount
    dialogueNewCount: dialogueCount(answered: false)
    dialogueMaxAnsweredTime
  }
`;
