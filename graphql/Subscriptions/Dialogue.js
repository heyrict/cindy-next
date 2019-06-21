import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const DIALOGUE_HINT_SUBSCRIPTION = gql`
  subscription DialogueHintSubscription($puzzleId: Int!, $userId: Int) {
    dialogueHintSub(puzzleId: $puzzleId, userId: $userId) {
      eventType
      sui_hei_dialogue {
        id
        ...DialogueShared
      }
      sui_hei_hint {
        ...HintShared
      }
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
  ${HINT_SHARED_FRAGMENT}
`;
