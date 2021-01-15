import { gql } from '@apollo/client';

export const ADD_AWARD_MUTATION = gql`
  mutation AddAwardMutation($awardId: Int!) {
    createUserAward(data: { awardId: $awardId }) {
      id
      created
      award {
        id
        name
        description
      }
    }
  }
`;
