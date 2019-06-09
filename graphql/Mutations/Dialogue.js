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

export const EditQuestionMutation = gql`
  mutation EditQuestionMutation($question: String, $dialogueId: Int!) {
    update_sui_hei_dialogue(
      _inc: { questionEditTimes: 1 }
      _set: { question: $question }
      where: { id: { _eq: $dialogueId } }
    ) {
      returning {
        id
        question
        questionEditTimes
      }
    }
  }
`;

export const EditAnswerMutation = gql`
  mutation EditAnswerMutation(
    $answer: String
    $good: Boolean
    $true: Boolean
    $dialogueId: Int!
    $increaseEditTimes: Int!
  ) {
    update_sui_hei_dialogue(
      _inc: { answerEditTimes: $increaseEditTimes }
      _set: { answer: $answer, good: $good, true: $true }
      where: { id: { _eq: $dialogueId } }
    ) {
      returning {
        id
        answer
        good
        true
        answerEditTimes
        answeredtime
      }
    }
  }
`;
