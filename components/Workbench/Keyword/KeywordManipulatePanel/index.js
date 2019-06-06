import React from 'react';
import PropTypes from 'prop-types';

import KeywordSelect from './KeywordSelect';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { panelEnum } from './constants';

const KeywordManipulatePanel = ({ keywordManipulatePanel }) => {
  return (
    <React.Fragment>
      {keywordManipulatePanel === panelEnum.select && (
        <KeywordSelect />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  keywordManipulatePanel: addReplayReducer.rootSelector(state).keywordManipulatePanel,
})

const withRedux = connect(mapStateToProps);

export default withRedux(KeywordManipulatePanel);
