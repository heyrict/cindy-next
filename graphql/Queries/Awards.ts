import gql from 'graphql-tag';

export const ALL_AWARDS_QUERY = gql`
  query AllAwardsQuery {
    award {
      id
      name
      description
    }
  }
`;

export const AWARDS_INFO_QUERY = gql`
  query AwardsInfoQuery($userId: Int!) {
    user_by_pk(id: $userId) {
      id
      date_joined
      user_awards {
        id
        award_id
      }
      puzzles_aggregate {
        aggregate {
          count
          max {
            created
          }
        }
      }
      yami_puzzles_aggregate: puzzles_aggregate(where: { yami: { _neq: 0 } }) {
        aggregate {
          count
        }
      }
      good_questions_aggregate: dialogues_aggregate(
        where: { good: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      true_answers_aggregate: dialogues_aggregate(
        where: { true: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      dialogues_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const PUZZLE_GENRE_GROUPS_QUERY = gql`
  query PuzzleGenreGroupsQuery($userId: Int!) {
    user_puzzle_genre_groups(args: { userId: $userId }) {
      group
      value
    }
  }
`;

export const PUZZLE_STAR_COUNT_GROUPS_QUERY = gql`
  query PuzzleStarCountGroupsQuery($userId: Int!) {
    user_star_groups(args: { userId: $userId }) {
      group
      value
    }
  }
`;
