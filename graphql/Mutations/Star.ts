import gql from 'graphql-tag';

export const ADD_STAR_MUTATION = gql`
  mutation AddStarMutation($puzzleId: Int!, $value: Int!) {
    createStar(data: { puzzleId: $puzzleId, value: $value }) {
      id
      value
    }
  }
`;

// TODO these mutations are created upon splitting the upsert mutation above
export const UPDATE_STAR_MUTATION = gql`
  mutation UpdateStarMutation($id: Int!, $value: Int!) {
    updateStar(id: $id, set: { value: $value }) {
      id
      value
    }
  }
`;
