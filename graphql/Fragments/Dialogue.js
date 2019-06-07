import gql from 'graphql-tag';

import { UserBriefFragment } from './User';

export const DialogueSharedFragment = gql`
  fragment DialogueShared on sui_hei_dialogue {
    id
    good
    true
    question
    questionEditTimes
    answer
    answerEditTimes
    created
    answeredtime
    sui_hei_user {
      ...UserBrief
    }
  }
  ${UserBriefFragment}
`;
