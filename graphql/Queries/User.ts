import gql from 'graphql-tag';

import { USER_BRIEF_FRAGMENT } from '../Fragments/User';
import { USER_AWARD_FRAGMENT } from '../Fragments/UserAward';

export const USER_BRIEF_QUERY = gql`
  query UserBriefQuery($id: Int!) {
    user(id: $id) {
      ...UserBrief
    }
  }
  ${USER_BRIEF_FRAGMENT}
`;

export const USER_BRIEF_EXTRA_QUERY = gql`
  query UserBriefExtraQuery($id: Int!) {
    user(id: $id) {
      id
      profile
      dateJoined
      lastLogin
    }
  }
`;

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    user(id: $id) {
      id
      profile
      ...UserBrief
      dateJoined
      lastLogin
      hideBookmark
      userAwards {
        ...UserAward
      }
      puzzleCount
      goodQuestionCount
      trueAnswerCount
      dialogueCount
      commentCount
      starCount
      starSum
      receivedCommentCount
      receivedStarCount
      receivedStarSum
    }
  }
  ${USER_BRIEF_FRAGMENT}
  ${USER_AWARD_FRAGMENT}
`;

export const USERAWARD_CHECKER_QUERY = gql`
  query UserawardCheckerQuery($userId: Int!) {
    user(id: $userId) {
      id
      puzzleCount
      goodQuestionCount
      trueAnswerCount
      dialogueCount
    }
  }
`;

export const USER_LIST_QUERY = gql`
  query UserListQuery($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset, order: { id: DESC }) {
      id
      ...UserBrief
      profile
      dateJoined
      lastLogin
    }
    userCount
  }
  ${USER_BRIEF_FRAGMENT}
`;
