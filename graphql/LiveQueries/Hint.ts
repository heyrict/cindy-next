import gql from 'graphql-tag';

import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const HINT_LIVE_QUERY = gql`
  subscription HintLiveQuery($puzzleId: Int!, $limit: Int!) {
    hint(
      where: { puzzle_id: { _eq: $puzzleId } }
      limit: $limit
      order_by: { modified: desc }
    ) {
      ...HintShared
    }
  }
  ${HINT_SHARED_FRAGMENT}
`;

export const HINT_WITH_USER_LIVE_QUERY = gql`
  subscription HintWithUserLiveQuery(
    $puzzleId: Int!
    $userId: Int!
    $limit: Int!
  ) {
    hint(
      where: {
        puzzle_id: { _eq: $puzzleId }
        _or: [
          { receiver_id: { _is_null: true } }
          { receiver_id: { _eq: $userId } }
        ]
      }
      limit: $limit
      order_by: { modified: desc }
    ) {
      ...HintShared
    }
  }
  ${HINT_SHARED_FRAGMENT}
`;
