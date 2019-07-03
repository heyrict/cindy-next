import React from 'react';

import { Flex, Input, Box } from 'components/General';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { StateType, ActionContentType } from 'reducers/types';
import { SetMergeToBoxProps } from './types';

const SetMergeToBox = ({ keywordToMerge, setMergeTo }: SetMergeToBoxProps) => {
  return (
    <Flex p={1} flexWrap="wrap">
      <Box width={[2 / 5, 3 / 11, 2 / 5, 3 / 11]} textAlign="center">
        {keywordToMerge[0] || '?'}
      </Box>
      <Box width={[1 / 5, 1 / 11, 2 / 5, 1 / 11]} textAlign="center">
        +
      </Box>
      <Box width={[2 / 5, 3 / 11, 2 / 5, 3 / 11]} textAlign="center">
        {keywordToMerge[1] || '?'}
      </Box>
      <Box width={[1 / 5, 1 / 11, 2 / 5, 1 / 11]} textAlign="center">
        →
      </Box>
      <Box width={[2 / 5, 3 / 11, 2 / 5, 3 / 11]}>
        <Input
          placeholder={
            keywordToMerge[0] && keywordToMerge[1]
              ? `${keywordToMerge[0]}${keywordToMerge[1]}`
              : ''
          }
          width={1}
          onChange={e => setMergeTo(e.target.value)}
        />
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordToMerge: addReplayReducer.rootSelector(state).keywordToMerge,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setMergeTo: (value: string) =>
    dispatch(addReplayReducer.actions.setMergeTo(value)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SetMergeToBox);
