import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const COMMENT_FRAGMENT = gql`
  fragment Comment on sui_hei_comment {
    id
    content
    spoiler
    sui_hei_user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const COMMENT_DETAIL_FRAGMENT = gql`
  fragment CommentDetail on sui_hei_comment {
    ...Comment
    sui_hei_puzzle {
      id
      title
      genre
      yami
      sui_hei_user {
        ...UserBrief
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
