import React from 'react';

import KeywordSelect from './KeywordSelect';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { KeywordManipulatePanelProps, PanelEnum } from './types';
import { StateType } from 'reducers/types';

const KeywordManipulatePanel = ({
  keywordManipulatePanel,
}: KeywordManipulatePanelProps) => {
  return (
    <React.Fragment>
      {keywordManipulatePanel === PanelEnum.SELECT && <KeywordSelect />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordManipulatePanel: addReplayReducer.rootSelector(state)
    .keywordManipulatePanel,
});

const withRedux = connect(mapStateToProps);

export default withRedux(KeywordManipulatePanel);
