import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';

export const ADD_QUESTION_MUTATION = gql`
  mutation AddQuestionMutation($question: String, $puzzleId: Int) {
    insert_dialogue(objects: { question: $question, puzzle_id: $puzzleId }) {
      returning {
        ...DialogueShared
      }
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;

export const EDIT_QUESTION_MUTATION = gql`
  mutation EditQuestionMutation($question: String, $dialogueId: Int!) {
    update_dialogue(
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

export const EDIT_ANSWER_MUTATION = gql`
  mutation EditAnswerMutation(
    $answer: String
    $good: Boolean
    $true: Boolean
    $dialogueId: Int!
    $increaseEditTimes: Int!
  ) {
    update_dialogue(
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
