import { gql } from '@apollo/client';

export const UPDATE_DEFAULT_LICENSE_MUTATION = gql`
  mutation UpdateDefaultLicenseMutation($userId: Int!, $licenseId: Int) {
    updateUser(id: $userId, set: { defaultLicenseId: $licenseId }) {
      id
      defaultLicenseId
    }
  }
`;
