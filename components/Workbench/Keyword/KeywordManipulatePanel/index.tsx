import React from 'react';

import ChoosePanelToolbar from './ChoosePanelToolbar';
import KeywordSelect from './KeywordSelect';
import KeywordRename from './KeywordRename';
import KeywordMerge from './KeywordMerge';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { KeywordManipulatePanelProps } from './types';
import { StateType, AddReplayPanelType } from 'reducers/types';

const KeywordManipulatePanel = ({
  keywordManipulatePanel,
}: KeywordManipulatePanelProps) => {
  return (
    <React.Fragment>
      <ChoosePanelToolbar />
      {keywordManipulatePanel === AddReplayPanelType.KEYWORD_SELECT && (
        <KeywordSelect />
      )}
      {keywordManipulatePanel === AddReplayPanelType.KEYWORD_EDIT && (
        <KeywordRename />
      )}
      {keywordManipulatePanel === AddReplayPanelType.KEYWORD_MERGE && (
        <KeywordMerge />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordManipulatePanel: addReplayReducer.rootSelector(state)
    .keywordManipulatePanel,
});

const withRedux = connect(mapStateToProps);

export default withRedux(KeywordManipulatePanel);
