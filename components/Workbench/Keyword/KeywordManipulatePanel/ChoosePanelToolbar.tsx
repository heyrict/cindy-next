import React from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

import { Flex, Button } from 'components/General';

import { ChoosePanelToolbarProps } from './types';
import {
  StateType,
  ActionContentType,
  AddReplayPanelType,
} from 'reducers/types';

const ChoosePanelToolbar = ({
  keywordManipulatePanel,
  setKeywordManipulatePanel,
}: ChoosePanelToolbarProps) => (
  <Flex flexWrap="wrap">
    <Button
      bg={
        keywordManipulatePanel === AddReplayPanelType.KEYWORD_SELECT
          ? 'yellow.5'
          : 'yellow.3'
      }
      onClick={() =>
        setKeywordManipulatePanel(AddReplayPanelType.KEYWORD_SELECT)
      }
    >
      <FormattedMessage {...messages.selectPanel} />
    </Button>
    <Button
      bg={
        keywordManipulatePanel === AddReplayPanelType.KEYWORD_MERGE
          ? 'yellow.5'
          : 'yellow.3'
      }
      onClick={() =>
        setKeywordManipulatePanel(AddReplayPanelType.KEYWORD_MERGE)
      }
    >
      <FormattedMessage {...messages.mergePanel} />
    </Button>
    <Button
      bg={
        keywordManipulatePanel === AddReplayPanelType.KEYWORD_EDIT
          ? 'yellow.5'
          : 'yellow.3'
      }
      onClick={() => setKeywordManipulatePanel(AddReplayPanelType.KEYWORD_EDIT)}
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
  setKeywordManipulatePanel: (panel: AddReplayPanelType) =>
    dispatch(addReplayReducer.actions.setKeywordManipulatePanel(panel)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChoosePanelToolbar);
