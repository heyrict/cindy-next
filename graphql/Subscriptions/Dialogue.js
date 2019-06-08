import gql from 'graphql-tag';

import { DialogueSharedFragment } from '../Fragments/Dialogue';
import { UserBriefFragment } from '../Fragments/User';

export const DialogueHintSubscription = gql`
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
  ${DialogueSharedFragment}
  ${UserBriefFragment}
`;
