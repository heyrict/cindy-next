import { gql } from '@apollo/client';

import { IMAGE_FRAGMENT } from '../Fragments/Image';

export const IMAGES_QUERY = gql`
  query ImagesQuery(
    $userId: Int
    $puzzleId: Int
    $puzzleNull: Boolean
    $limit: Int
    $offset: Int
  ) {
    images(
      filter: {
        userId: { eq: $userId }
        puzzleId: { eq: $puzzleId, isNull: $puzzleNull }
      }
      limit: $limit
      offset: $offset
      order: [{ created: DESC }]
    ) @connection(key: "images", filter: ["filter"]) {
      ...Image
    }
  }
  ${IMAGE_FRAGMENT}
`;
