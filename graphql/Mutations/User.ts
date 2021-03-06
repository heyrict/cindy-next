import { gql } from '@apollo/client';

import { USER_AWARD_FRAGMENT } from '../Fragments/UserAward';

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation($userId: Int!, $content: String!) {
    updateUser(id: $userId, set: { profile: $content }) {
      id
      profile
    }
  }
`;

export const EDIT_ICON_MUTATION = gql`
  mutation EditIconMutation($userId: Int!, $icon: String) {
    updateUser(id: $userId, set: { icon: $icon }) {
      id
      icon
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
