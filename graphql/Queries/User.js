const gql = require('graphql-tag');

const { UserBriefFragment } = require('../Fragments/User');

const UserBriefQuery = gql`
  query UserBriefQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      ...UserBrief
    }
  }
  ${UserBriefFragment}
`;

const UserQuery = gql`
  query UserQuery($id: Int!) {
    sui_hei_user_by_pk(id: $id) {
      id
      profile
      ...UserBrief
      sui_hei_puzzles_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_dialogues_aggregate {
        aggregate {
          count
        }
      }
      sui_hei_comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${UserBriefFragment}
`;

module.exports = {
  UserBriefQuery,
  UserQuery,
};
