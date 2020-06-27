import gql from 'graphql-tag';

export const ADD_AWARD_MUTATION = gql`
  mutation AddAwardMutation($awardId: Int) {
    insert_user_award(objects: [{ award_id: $awardId }]) {
      returning {
        id
        created
        award {
          id
          name
          description
        }
      }
    }
  }
`;
