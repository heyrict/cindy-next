import gql from 'graphql-tag';

export const ADD_AWARD_MUTATION = gql`
  mutation AddAwardMutation($awardId: Int) {
    insert_sui_hei_useraward(objects: [{ award_id: $awardId }]) {
      returning {
        id
        created
        sui_hei_award {
          id
          name
          description
        }
      }
    }
  }
`;
