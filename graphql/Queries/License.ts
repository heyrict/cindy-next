import { gql } from '@apollo/client';

import { LICENSE_BRIEF_FRAGMENT } from 'graphql/Fragments/License';

export const LICENSE_BRIEF_QUERY = gql`
  query LicenseBriefQuery($id: Int!) {
    license(id: $id) {
      ...LicenseBrief
    }
  }
  ${LICENSE_BRIEF_FRAGMENT}
`;

export const LICENSES_QUERY = gql`
  query LicensesQuery {
    licenses(filter: { userId: { eq: null } }, order: { id: ASC }) {
      ...LicenseBrief
    }
  }
  ${LICENSE_BRIEF_FRAGMENT}
`;
