import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const DIALOGUE_HINT_SUBSCRIPTION = gql`
  subscription DialogueHintSubscription($puzzleId: Int!) {
    dialogueHintSub(puzzleId: $puzzleId) {
      eventType
      sui_hei_dialogue {
        id
        ...DialogueShared
      }
      sui_hei_hint {
        id
        content
        created
      }
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
  ${USER_BRIEF_FRAGMENT}
`;
