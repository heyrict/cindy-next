import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';

export const DIALOGUE_LIVE_QUERY = gql`
  subscription DialogueLiveQuery($puzzleId: Int!, $limit: Int!) {
    sui_hei_dialogue(
      where: { puzzle_id: { _eq: $puzzleId } }
      limit: $limit
      order_by: { modified: desc }
    ) {
      ...DialogueShared
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;

export const DIALOGUE_WITH_USER_LIVE_QUERY = gql`
  subscription DialogueWithUserLiveQuery(
    $puzzleId: Int!
    $userId: Int!
    $limit: Int!
  ) {
    sui_hei_dialogue(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
      limit: $limit
      order_by: { modified: desc }
    ) {
      ...DialogueShared
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;
