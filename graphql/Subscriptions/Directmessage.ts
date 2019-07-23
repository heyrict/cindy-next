import gql from 'graphql-tag';

import { DIRECTMESSAGE_FRAGMENT } from '../Fragments/Directmessage';

export const DIRECTMESSAGE_SUBSCRIPTION = gql`
  subscription DirectmessageSubscription($userId: Int!) {
    directmessageSub(userId: $userId) {
      eventType
      sui_hei_directmessage {
        ...Directmessage
      }
    }
  }
  ${DIRECTMESSAGE_FRAGMENT}
`;
