import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

import { Flex, Box, Button } from 'components/General';
import { panelEnum } from './constants';

const ChoosePanelToolbar = ({
  keywordManipulatePanel,
  setKeywordManipulatePanel,
}) => (
  <Flex flexWrap="wrap">
    <Button
      bg={keywordManipulatePanel === panelEnum.select ? 'yellow.5' : 'yellow.3'}
      onClick={() => setKeywordManipulatePanel(panelEnum.select)}
    >
      <FormattedMessage {...messages.selectPanel} />
    </Button>
    <Button
      bg={keywordManipulatePanel === panelEnum.merge ? 'yellow.5' : 'yellow.3'}
      onClick={() => setKeywordManipulatePanel(panelEnum.merge)}
    >
      <FormattedMessage {...messages.mergePanel} />
    </Button>
    <Button
      bg={keywordManipulatePanel === panelEnum.rename ? 'yellow.5' : 'yellow.3'}
      onClick={() => setKeywordManipulatePanel(panelEnum.rename)}
    >
      <FormattedMessage {...messages.renamePanel} />
    </Button>
  </Flex>
);

ChoosePanelToolbar.propTypes = {
  keywordManipulatePanel: PropTypes.number.isRequired,
  setKeywordManipulatePanel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  keywordManipulatePanel: addReplayReducer.rootSelector(state)
    .keywordManipulatePanel,
});

const mapDispatchToProps = dispatch => ({
  setKeywordManipulatePanel: panel =>
    dispatch(addReplayReducer.actions.setKeywordManipulatePanel(panel)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChoosePanelToolbar);
