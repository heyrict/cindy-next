import { gql } from '@apollo/client';

import { IMAGE_FRAGMENT } from '../Fragments/Image';

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload!, $puzzleId: Int) {
    uploadImage(data: { file: $file, puzzleId: $puzzleId }) {
      ...Image
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImage($id: UUID!) {
    deleteImage(id: $id) {
      ...Image
    }
  }
  ${IMAGE_FRAGMENT}
`;
