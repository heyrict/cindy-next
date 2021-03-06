import { gql } from '@apollo/client';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';
import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const DIALOGUE_HINT_QUERY = gql`
  query DialogueHintQuery($puzzleId: Int!, $userId: Int, $since: DateTime) {
    puzzleLogs(
      filter: {
        puzzleId: $puzzleId
        userId: { eq: $userId }
        modified: { gt: $since }
      }
      order: { created: ASC }
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
