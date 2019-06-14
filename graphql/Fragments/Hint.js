import gql from 'graphql-tag';

export const HINT_SHARED_FRAGMENT = gql`
  fragment HintShared on sui_hei_hint {
    id
    content
    created
    edittimes
    receiver {
      id
      nickname
    }
  }
`
