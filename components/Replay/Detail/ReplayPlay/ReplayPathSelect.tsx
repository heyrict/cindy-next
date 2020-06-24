import React from 'react';
import styled from 'theme/styled';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';

import { StateType, ActionContentType } from 'reducers/types';
import { ReplayPathSelectProps } from './types';

const PathSelectButton = styled.button`
  background: transparent;
  color: ${p => p.theme.colors.gray[1]};
  display: inline-flex;
  align-items: center;
`;

export const ReplayPathSelect = ({ path, setPath }: ReplayPathSelectProps) => (
  <Flex
    flexWrap="wrap"
    width={1}
    px={2}
    alignItems="center"
    borderRadius={2}
    bg="violet.7"
    mb={1}
  >
    <PathSelectButton onClick={() => setPath([])}>●</PathSelectButton>
    <Box display="inline-box" px={1} color="gray.1">
      »
    </Box>
    {path.map((kw, index) => (
      <React.Fragment key={`${kw}-${index}`}>
        <PathSelectButton onClick={() => setPath(path.slice(0, index + 1))}>
          {kw}
        </PathSelectButton>
        <Box display="inline-box" px={1} color="gray.1">
          »
        </Box>
      </React.Fragment>
    ))}
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  path: replayReducer.rootSelector(state).path,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setPath: (path: Array<string>) =>
    dispatch(replayReducer.actions.path.set(path)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplayPathSelect);
