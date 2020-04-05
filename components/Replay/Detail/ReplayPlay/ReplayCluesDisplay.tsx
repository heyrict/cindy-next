import React from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import ClueDisplay from './ClueDisplay';

import { StateType, ActionContentType } from 'reducers/types';
import { ReplayCluesDisplayProps } from './types';

const ReplayCluesDisplay = ({ milestones, clues }: ReplayCluesDisplayProps) =>
  clues.length > 0 ? (
    <>
      <Box
        width={1}
        borderRadius="5px 5px 0 0"
        bg="teal.7"
        px={2}
        color="indigo.1"
      >
        Clues
      </Box>
      <Flex
        width={1}
        maxHeight="400px"
        overflowY="auto"
        border="2px solid"
        borderRadius="0 0 5px 5px"
        borderColor="teal.7"
        mb={1}
      >
        {clues.map(clue => {
          let milestone = milestones.find(m => m.handle == clue);
          return (
            <React.Fragment key={`replay-clue-${clue}`}>
              {milestone ? <ClueDisplay milestone={milestone} /> : null}
            </React.Fragment>
          )})}
      </Flex>
    </>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  clues: replayReducer.rootSelector(state).clues,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  pushKeyword: (keyword: string) =>
    dispatch(replayReducer.actions.path.push(keyword)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplayCluesDisplay);
