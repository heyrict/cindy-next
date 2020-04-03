import React from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

import { Flex, Button } from 'components/General';

import {
  StateType,
  ActionContentType,
  AddReplayModeType,
} from 'reducers/types';
import { ChooseModeToolbarProps } from './types';

const ChooseModeToolbar = ({ mode, setMode }: ChooseModeToolbarProps) => (
  <Flex width={1} flexWrap="wrap">
    <Button
      bg={mode === AddReplayModeType.ROUGH ? 'red.5' : 'red.3'}
      onClick={() => setMode(AddReplayModeType.ROUGH)}
    >
      <FormattedMessage {...messages.roughMode} />
    </Button>
    <Button
      bg={mode === AddReplayModeType.ONE_BY_ONE ? 'red.5' : 'red.3'}
      onClick={() => setMode(AddReplayModeType.ONE_BY_ONE)}
    >
      <FormattedMessage {...messages.oneByOneMode} />
    </Button>
    <Button
      bg={mode === AddReplayModeType.PUZZLE ? 'red.5' : 'red.3'}
      onClick={() => setMode(AddReplayModeType.PUZZLE)}
    >
      <FormattedMessage {...messages.oneByOneMode} />
    </Button>
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  mode: addReplayReducer.rootSelector(state).mode,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setMode: (panel: AddReplayModeType) =>
    dispatch(addReplayReducer.actions.mode.set(panel)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChooseModeToolbar);
