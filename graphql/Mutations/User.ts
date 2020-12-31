import gql from 'graphql-tag';

import { USER_AWARD_FRAGMENT } from '../Fragments/UserAward';

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation($userId: Int!, $content: String!) {
    updateUser(id: $userId, set: { profile: $content }) {
      id
      profile
    }
  }
`;

export const CHANGE_CURRERNT_USERAWARD_MUTATION = gql`
  mutation ChangeCurrentUserawardMutation($userId: Int!, $userawardId: Int) {
    updateUser(id: $userId, set: { currentAwardId: $userawardId }) {
      id
      currentAward {
        ...UserAward
      }
    }
  }
  ${USER_AWARD_FRAGMENT}
`;

export const CHANGE_HIDE_BOOKMARK_MUTATION = gql`
  mutation ChangeHideBookmarkMutation($userId: Int!, $hideBookmark: Boolean!) {
    updateUser(id: $userId, set: { hideBookmark: $hideBookmark }) {
      id
      hideBookmark
    }
  }
`;

/* DEPRECATED
export const SET_LAST_READ_DM_MUTATION = gql`
  mutation SetLastReadDmMutation($userId: Int!, $directMessageId: Int!) {
    update_user(
      _set: { last_read_dm_id: $directMessageId }
      where: { id: { _eq: $userId } }
    ) {
      returning {
        id
        last_read_dm_id
      }
    }
  }
`;
*/
