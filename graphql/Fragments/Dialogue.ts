import { gql } from '@apollo/client';

import { USER_BRIEF_FRAGMENT } from './User';

export const DIALOGUE_SHARED_FRAGMENT = gql`
  fragment DialogueShared on Dialogue {
    id
    qno
    good
    true
    question
    questionEditTimes
    answer
    answerEditTimes
    created
    answeredTime
    user {
      ...UserBrief
    }
    modified
  }
  ${USER_BRIEF_FRAGMENT}
`;
