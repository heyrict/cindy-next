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
    sui_hei_user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
