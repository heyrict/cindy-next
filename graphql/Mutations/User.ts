import gql from 'graphql-tag';

import { USERAWARD_FRAGMENT } from '../Fragments/UserAward';

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation($userId: Int!, $content: String!) {
    update_sui_hei_user(
      _set: { profile: $content }
      where: { id: { _eq: $userId } }
    ) {
      returning {
        id
        profile
      }
    }
  }
`;

export const CHANGE_CURRERNT_USERAWARD_MUTATION = gql`
  mutation ChangeCurrentUserawardMutation($userId: Int!, $userawardId: Int) {
    update_sui_hei_user(
      _set: { current_award_id: $userawardId }
      where: { id: { _eq: $userId } }
    ) {
      returning {
        id
        sui_hei_current_useraward {
          ...UserAward
        }
      }
    }
  }
  ${USERAWARD_FRAGMENT}
`;

export const CHANGE_HIDE_BOOKMARK_MUTATION = gql`
  mutation ChangeHideBookmarkMutation($userId: Int!, $hideBookmark: Boolean!) {
    update_sui_hei_user(
      _set: { hide_bookmark: $hideBookmark }
      where: { id: { _eq: $userId } }
    ) {
      returning {
        id
        hide_bookmark
      }
    }
  }
`;

export const SET_LAST_READ_DM_MUTATION = gql`
  mutation SetLastReadDmMutation($userId: Int!, $directMessageId: Int!) {
    update_sui_hei_user(
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
