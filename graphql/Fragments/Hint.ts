import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';

export const HINT_SHARED_FRAGMENT = gql`
  fragment HintShared on hint {
    id
    content
    created
    edittimes
    receiver {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;
