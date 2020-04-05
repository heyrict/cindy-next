import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import addPuzzleMessages from 'messages/pages/add_puzzle';

import { Mutation } from '@apollo/react-components';
import { ADD_REPLAY_MUTATION } from 'graphql/Mutations/Replay';

import { Box, ButtonTransparent } from 'components/General';

import { ApolloError } from 'apollo-client/errors/ApolloError';
import { StateType, ActionContentType } from 'reducers/types';
import { ReplaySubmitButtonProps } from './types';
import {
  AddReplayMutation,
  AddReplayMutationVariables,
} from 'graphql/Mutations/generated/AddReplayMutation';

const ReplaySubmitButton = ({
  title,
  milestones,
  replayDialogues,
  puzzleId,
}: ReplaySubmitButtonProps) => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <Mutation<AddReplayMutation, AddReplayMutationVariables>
      mutation={ADD_REPLAY_MUTATION}
    >
      {addReplay => (
        <Box width={1} bg="orange.6" borderRadius={2} mx={3}>
          <ButtonTransparent
            disabled={submitting}
            width={1}
            color="orange.0"
            py={1}
            onClick={() => {
              if (submitting) return;
              addReplay({
                variables: {
                  puzzleId,
                  title,
                  milestones,
                  replayDialogues: replayDialogues.map(dialogue => ({
                    question: dialogue.question,
                    answer: dialogue.answer,
                    dependency: dialogue.dependency,
                    good: dialogue.good,
                    true: dialogue.true,
                    keywords: dialogue.question_keywords.map(kw => kw.name),
                    milestones: dialogue.milestones,
                  })),
                },
              })
                .then(returns => {
                  if (!returns) return;
                  const { data } = returns;
                  if (
                    !data ||
                    !data.insert_sui_hei_replay ||
                    !data.insert_sui_hei_replay.returning
                  ) {
                    toast.error('Error: no data returns');
                    setSubmitting(false);
                    return;
                  }
                  let replay = data.insert_sui_hei_replay.returning[0];
                  toast.info('Submitted successfully!');
                  // TODO clear saved local data
                  Router.push('/replay/[id]', `/replay/${replay.id}`);
                })
                .catch((error: ApolloError) => {
                  toast.error(error.message);
                  setSubmitting(false);
                });
            }}
          >
            <FormattedMessage {...addPuzzleMessages.publishPuzzle} />
          </ButtonTransparent>
        </Box>
      )}
    </Mutation>
  );
};

const mapStateToProps = (state: StateType) => ({
  puzzleId: addReplayReducer.rootSelector(state).puzzleId,
  title: addReplayReducer.rootSelector(state).title,
  milestones: addReplayReducer.rootSelector(state).milestones,
  replayDialogues: addReplayReducer.rootSelector(state).replayDialogues,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTitle: (title: string) =>
    dispatch(addReplayReducer.actions.title.set(title)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplaySubmitButton);
