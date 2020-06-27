import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from './User';

export const PUZZLE_SHARED_FRAGMENT = gql`
  fragment PuzzleShared on puzzle {
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
  fragment PuzzleAggregate on puzzle {
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
  ${PUZZLE_SHARED_FRAGMENT}
`;
