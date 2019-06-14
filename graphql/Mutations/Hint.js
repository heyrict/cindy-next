import gql from 'graphql-tag';

import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const ADD_HINT_MUTATION = gql`
  mutation AddHintMutation($puzzleId: Int!, $content: String!, $receiverId: Int) {
    insert_sui_hei_hint(
      objects: { puzzle_id: $puzzleId, content: $content, receiver_id: $receiverId }
    ) {
      returning {
        ...HintShared
      }
    }
  }
  ${HINT_SHARED_FRAGMENT}
`
