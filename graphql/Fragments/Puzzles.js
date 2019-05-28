import gql from 'graphql-tag';

import { UserBriefFragment } from './User';

export const PuzzleSharedFragment = gql`
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
  ${UserBriefFragment}
`;
