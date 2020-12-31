import gql from 'graphql-tag';

export const ALL_AWARDS_QUERY = gql`
  query AllAwardsQuery {
    awards {
      id
      name
      description
    }
  }
`;

export const AWARDS_INFO_QUERY = gql`
  query AwardsInfoQuery($userId: Int!) {
    user(id: $userId) {
      id
      dateJoined
      userAwards {
        id
        awardId
      }
      puzzleCount
      puzzleMaxCreated
      yamiPuzzleCount
      goodQuestionCount
      trueAnswerCount
      dialogueCount
    }
  }
`;
