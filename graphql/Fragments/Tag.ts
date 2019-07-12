import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from './User';

export const TAG_FRAGMENT = gql`
  fragment Tag on sui_hei_tag {
    id
    name
    created
  }
`;

export const PUZZLE_TAG_FRAGMENT = gql`
  fragment PuzzleTag on sui_hei_puzzle_tag {
    id
    sui_hei_tag {
      ...Tag
    }
    sui_hei_user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
  ${TAG_FRAGMENT}
`;
