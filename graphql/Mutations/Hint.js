import gql from 'graphql-tag';

import { HINT_SHARED_FRAGMENT } from '../Fragments/Hint';

export const ADD_HINT_MUTATION = gql`
  mutation AddHintMutation(
    $puzzleId: Int!
    $content: String!
    $receiverId: Int
  ) {
    insert_sui_hei_hint(
      objects: {
        puzzle_id: $puzzleId
        content: $content
        receiver_id: $receiverId
      }
    ) {
      returning {
        ...HintShared
      }
    }
  }
  ${HINT_SHARED_FRAGMENT}
`;

export const EDIT_HINT_MUTATION = gql`
  mutation EditHintMutation($hintId: Int!, $content: String!) {
    update_sui_hei_hint(
      _inc: { edittimes: 1 }
      _set: { content: $content }
      where: { id: { _eq: $hintId } }
    ) {
      returning {
        ...HintShared
      }
    }
  }
  ${HINT_SHARED_FRAGMENT}
`;
