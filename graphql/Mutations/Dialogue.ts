import gql from 'graphql-tag';

import { DIALOGUE_SHARED_FRAGMENT } from '../Fragments/Dialogue';

export const ADD_QUESTION_MUTATION = gql`
  mutation AddQuestionMutation($question: String!, $puzzleId: Int!) {
    createDialogue(data: { question: $question, puzzleId: $puzzleId }) {
      ...DialogueShared
    }
  }
  ${DIALOGUE_SHARED_FRAGMENT}
`;

export const EDIT_QUESTION_MUTATION = gql`
  mutation EditQuestionMutation($question: String, $dialogueId: Int!) {
    updateDialogue(id: $dialogueId, set: { question: $question }) {
      id
      question
      questionEditTimes
    }
  }
`;

export const EDIT_ANSWER_MUTATION = gql`
  mutation EditAnswerMutation(
    $answer: String
    $good: Boolean
    $true: Boolean
    $dialogueId: Int!
  ) {
    updateDialogue(
      id: $dialogueId
      set: { answer: $answer, good: $good, true: $true }
    ) {
      id
      answer
      good
      true
      answerEditTimes
      answeredTime
    }
  }
`;
