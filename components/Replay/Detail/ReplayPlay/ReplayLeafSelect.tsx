import React from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';
import { leavesSelector } from './selectors';

import { FormattedMessage } from 'react-intl';
import dialogueMessages from 'messages/components/dialogue';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import ButtonTransparent from 'components/General/ButtonTransparent';

import { StateType, ActionContentType } from 'reducers/types';
import { ReplayLeafSelectProps } from './types';

const ReplayLeafSelect = ({
  leaves,
  pushClues,
  pushLog,
  setTimeSolved,
  clearPath,
}: ReplayLeafSelectProps) =>
  leaves && leaves.length > 0 ? (
    <>
      <Box
        width={1}
        borderRadius="5px 5px 0 0"
        bg="lime.7"
        px={2}
        color="lime.1"
      >
        <FormattedMessage {...dialogueMessages.question} />
      </Box>
      <Flex
        flexWrap="wrap"
        width={1}
        maxHeight="400px"
        overflowY="auto"
        border="2px solid"
        borderRadius="0 0 5px 5px"
        borderColor="lime.7"
        mb={1}
      >
        {leaves.map(leaf => (
          <ButtonTransparent
            key={leaf.id}
            onClick={() => {
              pushLog(leaf.id);
              if (leaf.milestones) pushClues(leaf.milestones);
              if (leaf.true) setTimeSolved();
              clearPath();
            }}
            mr={1}
          >
            Q. {leaf.question}
          </ButtonTransparent>
        ))}
      </Flex>
    </>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  leaves: leavesSelector(state),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  pushClues: (clues: Array<string>) =>
    dispatch(replayReducer.actions.pushClues(clues)),
  pushLog: (log: number) => dispatch(replayReducer.actions.logs.push(log)),
  setTimeSolved: () =>
    dispatch(replayReducer.actions.timeSolved.set(new Date().toISOString())),
  clearPath: () => dispatch(replayReducer.actions.path.empty()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplayLeafSelect);
