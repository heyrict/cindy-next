import gql from 'graphql-tag';

import { DialogueSharedFragment } from '../Fragments/Dialogue';

export const AddQuestionMutation = gql`
  mutation AddQuestionMutation($question: String, $puzzleId: Int) {
    insert_sui_hei_dialogue(
      objects: { question: $question, puzzle_id: $puzzleId }
    ) {
      returning {
        ...DialogueShared
      }
    }
  }
  ${DialogueSharedFragment}
`;
