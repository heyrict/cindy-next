import gql from 'graphql-tag';

export const ADD_REPLAY_MUTATION = gql`
  mutation AddReplayMutation(
    $puzzleId: Int!
    $replayDialogues: [replay_dialogue_insert_input!]!
    $title: String!
    $milestones: jsonb!
  ) {
    insert_replay(
      objects: {
        title: $title
        puzzle_id: $puzzleId
        milestones: $milestones
        replay_dialogues: { data: $replayDialogues }
      }
    ) {
      returning {
        id
        created
      }
    }
  }
`;
