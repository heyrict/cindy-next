import gql from 'graphql-tag';

export const ADD_REPLAY_MUTATION = gql`
  mutation AddReplayMutation(
    $puzzleId: Int!
    $replayDialogues: [sui_hei_replay_dialogue_insert_input!]!
    $title: String!
    $milestones: jsonb!
  ) {
    insert_sui_hei_replay(
      objects: {
        title: $title
        puzzle_id: $puzzleId
        milestones: $milestones
        sui_hei_replay_dialogues: { data: $replayDialogues }
      }
    ) {
      returning {
        id
        created
      }
    }
  }
`;
