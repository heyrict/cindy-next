import gql from 'graphql-tag';

export const ALL_AWARDS_QUERY = gql`
  query AllAwardsQuery {
    sui_hei_award {
      id
      name
      description
    }
  }
`;

export const AWARDS_INFO_QUERY = gql`
  query AwardsInfoQuery($userId: Int!) {
    sui_hei_user_by_pk(id: $userId) {
      id
      date_joined
      sui_hei_userawards {
        id
        award_id
      }
      sui_hei_puzzles_aggregate {
        aggregate {
          count
          max {
            created
          }
        }
      }
      yami_puzzles_aggregate: sui_hei_puzzles_aggregate(
        where: { yami: { _neq: 0 } }
      ) {
        aggregate {
          count
        }
      }
      good_questions_aggregate: sui_hei_dialogues_aggregate(
        where: { good: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      true_answers_aggregate: sui_hei_dialogues_aggregate(
        where: { true: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      sui_hei_dialogues_aggregate {
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
