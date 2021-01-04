import { gql } from '@apollo/client';

import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const ADD_HINT_MUTATION = gql`
  mutation AddHintMutation(
    $puzzleId: Int!
    $content: String!
    $receiverId: Int
  ) {
    createHint(
      data: { puzzleId: $puzzleId, content: $content, receiverId: $receiverId }
    ) {
      ...HintShared
    }
  }
  ${HINT_SHARED_FRAGMENT}
`;

export const EDIT_HINT_MUTATION = gql`
  mutation EditHintMutation($hintId: Int!, $content: String!) {
    updateHint(id: $hintId, set: { content: $content }) {
      ...HintShared
    }
  }
  ${HINT_SHARED_FRAGMENT}
`;
