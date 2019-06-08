import gql from 'graphql-tag';

import { DialogueSharedFragment } from '../Fragments/Dialogue';

export const DialogueHintQuery = gql`
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
  ${DialogueSharedFragment}
`;
