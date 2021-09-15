import { gql } from '@apollo/client';

export const LICENSE_BRIEF_FRAGMENT = gql`
  fragment LicenseBrief on License {
    id
    name
    description
    url
  }
`;
