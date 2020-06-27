import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const COMMENT_FRAGMENT = gql`
  fragment Comment on comment {
    id
    content
    spoiler
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const COMMENT_DETAIL_FRAGMENT = gql`
  fragment CommentDetail on comment {
    ...Comment
    puzzle {
      id
      title
      genre
      yami
      user {
        ...UserBrief
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
