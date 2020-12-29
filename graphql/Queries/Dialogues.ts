import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const DIALOGUE_HINT_QUERY = gql`
  query DialogueHintQuery($puzzleId: Int, $userId: Int) {
    dialogue(
      where: { puzzle_id: { _eq: $puzzleId }, user_id: { _eq: $userId } }
      order_by: { id: asc }
    ) {
      ...DialogueShared
    }
    hint(
      where: {
        puzzle_id: { _eq: $puzzleId }
        _or: [
          { receiver_id: { _eq: $userId } }
          { receiver_id: { _is_null: true } }
        ]
      }
      order_by: { id: asc }
    ) {
      ...HintShared
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
  ${USER_BRIEF_FRAGMENT}
  ${HINT_SHARED_FRAGMENT}
`;
