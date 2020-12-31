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

/* Deprecated
export const PUZZLE_GENRE_GROUPS_QUERY = gql`
  query PuzzleGenreGroupsQuery($userId: Int!) {
    user_puzzle_genre_groups(args: { userId: $userId }) {
      group
      value
    }
  }
`;
*/

/* Deprecated
export const PUZZLE_STAR_COUNT_GROUPS_QUERY = gql`
  query PuzzleStarCountGroupsQuery($userId: Int!) {
    user_star_groups(args: { userId: $userId }) {
      group
      value
    }
  }
`;
*/
