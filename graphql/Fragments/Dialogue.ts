import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from './User';

export const DIALOGUE_SHARED_FRAGMENT = gql`
  fragment DialogueShared on dialogue {
    id
    qno
    good
    true
    question
    questionEditTimes
    answer
    answerEditTimes
    created
    answeredtime
    user {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
