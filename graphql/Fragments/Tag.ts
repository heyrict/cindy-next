import { gql } from '@apollo/client';

import { USER_BRIEF_FRAGMENT } from './User';

export const TAG_FRAGMENT = gql`
  fragment Tag on Tag {
    id
    name
    created
  }
`;

export const PUZZLE_TAG_FRAGMENT = gql`
  fragment PuzzleTag on PuzzleTag {
    id
    tag {
      ...Tag
    }
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
  ${TAG_FRAGMENT}
`;
