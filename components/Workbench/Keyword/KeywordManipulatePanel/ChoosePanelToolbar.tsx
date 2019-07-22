import React from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

import { Flex, Button } from 'components/General';

import { PanelEnum, ChoosePanelToolbarProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

const ChoosePanelToolbar = ({
  keywordManipulatePanel,
  setKeywordManipulatePanel,
}: ChoosePanelToolbarProps) => (
  <Flex flexWrap="wrap">
    <Button
      bg={keywordManipulatePanel === PanelEnum.SELECT ? 'yellow.5' : 'yellow.3'}
      onClick={() => setKeywordManipulatePanel(PanelEnum.SELECT)}
    >
      <FormattedMessage {...messages.selectPanel} />
    </Button>
    <Button
      bg={keywordManipulatePanel === PanelEnum.MERGE ? 'yellow.5' : 'yellow.3'}
      onClick={() => setKeywordManipulatePanel(PanelEnum.MERGE)}
    >
      <FormattedMessage {...messages.mergePanel} />
    </Button>
    <Button
      bg={keywordManipulatePanel === PanelEnum.RENAME ? 'yellow.5' : 'yellow.3'}
      onClick={() => setKeywordManipulatePanel(PanelEnum.RENAME)}
    >
      <FormattedMessage {...messages.renamePanel} />
    </Button>
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  keywordManipulatePanel: addReplayReducer.rootSelector(state)
    .keywordManipulatePanel,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setKeywordManipulatePanel: (panel: PanelEnum) =>
    dispatch(addReplayReducer.actions.keywordManipulatePanel.set(panel)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChoosePanelToolbar);
