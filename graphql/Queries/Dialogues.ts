import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const DIALOGUE_HINT_QUERY = gql`
  query DialogueHintQuery($puzzleId: Int!, $userId: Int) {
    puzzleLogs(
      filter: { puzzleId: $puzzleId, userId: $userId }
      order: { id: ASC }
    ) {
      ... on Dialogue {
        ...DialogueShared
      }
      ... on Hint {
        ...HintShared
      }
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
  ${HINT_SHARED_FRAGMENT}
`;
