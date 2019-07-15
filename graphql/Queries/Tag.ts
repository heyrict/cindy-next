import gql from 'graphql-tag';

import { PUZZLE_TAG_FRAGMENT, TAG_FRAGMENT } from '../Fragments/Tag';

export const PUZZLE_PAGE_TAGS_QUERY = gql`
  query PuzzlePageTagsQuery($puzzleId: Int!) {
    sui_hei_puzzle_tag(where: { puzzle_id: { _eq: $puzzleId } }) {
      ...PuzzleTag
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const TAG_QUERY = gql`
  query TagQuery($tagId: Int!) {
    sui_hei_tag_by_pk(id: $tagId) {
      ...Tag
    }
  }
  ${TAG_FRAGMENT}
`

export const PUZZLE_TAGS_SEARCH_QUERY = gql`
  query PuzzleTagsSearchQuery($search: String, $limit: Int!) {
    sui_hei_tag(
      where: { name: { _like: $search } }
      order_by: { sui_hei_puzzle_tags_aggregate: { count: desc } }
      limit: $limit
    ) {
      ...Tag
    }
  }
  ${TAG_FRAGMENT}
`;
