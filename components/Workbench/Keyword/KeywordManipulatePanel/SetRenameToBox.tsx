import React from 'react';

import { Flex, Input, Box } from 'components/General';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { StateType, ActionContentType } from 'reducers/types';
import { SetRenameToBoxProps } from './types';

const SetRenameToBox = ({
  keywordToRename,
  setRenameTo,
}: SetRenameToBoxProps) => {
  return (
    <Flex p={1}>
      <Box width={2 / 5} textAlign="center">
        {keywordToRename || '?'}
      </Box>
      <Box width={1 / 5} textAlign="center">
        →
      </Box>
      <Box width={2 / 5}>
        <Input width={1} onChange={e => setRenameTo(e.target.value)} />
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordToRename: addReplayReducer.rootSelector(state).keywordToEdit,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setRenameTo: (value: string) =>
    dispatch(addReplayReducer.actions.renameTo.set(value)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SetRenameToBox);
