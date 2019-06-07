const gql = require('graphql-tag');

const UserBriefFragment = gql`
  fragment UserBrief on sui_hei_user {
    id
    nickname
    username
    sui_hei_current_useraward {
      id
      created
      sui_hei_award {
        id
        name
        description
      }
    }
  }
`;

module.exports = {
  UserBriefFragment,
};
