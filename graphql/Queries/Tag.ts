import gql from 'graphql-tag';

import { PUZZLE_TAG_FRAGMENT } from '../Fragments/Tag';

export const PUZZLE_PAGE_TAGS_QUERY = gql`
  query PuzzlePageTagsQuery($puzzleId: Int!) {
    sui_hei_puzzle_tag(where: { puzzle_id: { _eq: $puzzleId } }) {
      ...PuzzleTag
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;
