import { gql } from '@apollo/client';

import { PUZZLE_TAG_FRAGMENT, TAG_FRAGMENT } from '../Fragments/Tag';

export const PUZZLE_PAGE_TAGS_QUERY = gql`
  query PuzzlePageTagsQuery($puzzleId: Int!) {
    puzzleTags(filter: { puzzleId: { eq: $puzzleId } }) {
      ...PuzzleTag
    }
  }
  ${PUZZLE_TAG_FRAGMENT}
`;

export const TAG_QUERY = gql`
  query TagQuery($tagId: Int!) {
    tag(id: $tagId) {
      ...Tag
    }
  }
  ${TAG_FRAGMENT}
`;

export const PUZZLE_TAGS_SEARCH_QUERY = gql`
  query PuzzleTagsSearchQuery($search: String, $limit: Int!) {
    tags(filter: { name: { like: $search } }, limit: $limit) {
      id
      name
      created
    }
  }
`;

export const TAGS_PAGE_QUERY = gql`
  query TagsPageQuery(
    $name: String
    $limit: Int!
    $offset: Int!
    $orderBy: [TagAggrOrder!]
  ) {
    tags(
      filter: { name: { like: $name } }
      order: $orderBy
      limit: $limit
      offset: $offset
    ) {
      id
      name
      created
      puzzleTagCount
    }
  }
`;
