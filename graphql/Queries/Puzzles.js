import gql from 'graphql-tag';

import { UserBriefFragment } from '../Fragments/User';

export const PuzzlesUnsolvedQuery = gql`
  query PuzzlesUnsolvedQuery {
    sui_hei_puzzle(
      order_by: { modified: desc }
      where: { status: { _eq: 0 } }
    ) {
      id
      genre
      title
      status
      yami
      anonymous
      created
      dazed_on
      sui_hei_user {
        ...UserBrief
      }
    }
  }
  ${UserBriefFragment}
`;
