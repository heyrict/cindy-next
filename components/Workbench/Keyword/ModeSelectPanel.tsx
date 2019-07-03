import React from 'react';

import ChooseModeToolbar from './ChooseModeToolbar';
import KeywordManipulatePanel from './KeywordManipulatePanel';
import DialogueManipulatePanel from './DialogueManipulatePanel';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { ModeSelectPanelProps } from './types';
import { StateType, AddReplayModeType } from 'reducers/types';

const ModeSelectPanel = ({ mode }: ModeSelectPanelProps) => {
  return (
    <React.Fragment>
      <ChooseModeToolbar />
      {mode === AddReplayModeType.ROUGH && <KeywordManipulatePanel />}
      {mode === AddReplayModeType.ONE_BY_ONE && <DialogueManipulatePanel />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  mode: addReplayReducer.rootSelector(state).mode,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ModeSelectPanel);
