import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from './User';

export const TAG_FRAGMENT = gql`
  fragment Tag on tag {
    id
    name
    created
  }
`;

export const PUZZLE_TAG_FRAGMENT = gql`
  fragment PuzzleTag on puzzle_tag {
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
