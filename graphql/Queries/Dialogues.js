import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';

export const DIALOGUE_HINT_QUERY = gql`
  query DialogueHintQuery($puzzleId: Int, $userId: Int) {
    sui_hei_dialogue(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
      order_by: { id: asc }
    ) {
      ...DialogueShared
    }
    sui_hei_hint(
      where: { puzzle_id: { _eq: $puzzleId } }
      order_by: { id: asc }
    ) {
      id
      content
      created
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;
