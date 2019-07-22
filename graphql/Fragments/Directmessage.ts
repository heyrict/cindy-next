import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const DIRECTMESSAGE_FRAGMENT = gql`
  fragment Directmessage on sui_hei_directmessage {
    id
    content
    created
    sender {
      ...UserBrief
    }
    receiver {
      ...UserBrief
    }
    editTimes
  }
  ${USER_BRIEF_FRAGMENT}
`;
