import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from './User';

export const PUZZLE_SHARED_FRAGMENT = gql`
  fragment PuzzleShared on sui_hei_puzzle {
    id
    genre
    title
    status
    yami
    anonymous
    created
    modified
    grotesque
    sui_hei_user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const PUZZLE_AGGREGATE_FRAGMENT = gql`
  fragment PuzzleAggregate on sui_hei_puzzle {
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
`;
