import React from 'react';

import { Flex, Input, Box } from 'components/General';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { StateType, ActionContentType } from 'reducers/types';
import { SetRenameToBoxProps } from './types';

const SetRenameToBox = ({
  keywordFilter,
  renameTo,
  setRenameTo,
}: SetRenameToBoxProps) => {
  return (
    <Flex p={1}>
      <Box width={2 / 5} textAlign="center">
        {keywordFilter}
      </Box>
      <Box width={1 / 5} textAlign="center">
        →
      </Box>
      <Box width={2 / 5}>
        <Input
          width={1}
          value={renameTo}
          onChange={e => setRenameTo(e.target.value)}
        />
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordFilter: addReplayReducer.rootSelector(state).keywordToEdit,
  renameTo: addReplayReducer.rootSelector(state).renameTo,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setRenameTo: (value: string) =>
    dispatch(addReplayReducer.actions.setRenameTo(value)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SetRenameToBox);
