import React from 'react';

import { Box } from 'components/General';
import ChoosePanelToolbar from './ChoosePanelToolbar';
import KeywordSelect from './KeywordSelect';
import KeywordRename from './KeywordRename';
import KeywordMerge from './KeywordMerge';
import KeywordPanel from '../shared/KeywordPanel';
import KeywordFilter from './KeywordFilter';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

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
      <KeywordPanel>
        <Box fontSize={3}>
          <FormattedMessage {...messages.keywords} />
        </Box>
        <KeywordFilter />
        {keywordManipulatePanel === AddReplayPanelType.KEYWORD_SELECT && (
          <KeywordSelect />
        )}
        {keywordManipulatePanel === AddReplayPanelType.KEYWORD_EDIT && (
          <KeywordRename />
        )}
        {keywordManipulatePanel === AddReplayPanelType.KEYWORD_MERGE && (
          <KeywordMerge />
        )}
      </KeywordPanel>
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordManipulatePanel: addReplayReducer.rootSelector(state)
    .keywordManipulatePanel,
});

const withRedux = connect(mapStateToProps);

export default withRedux(KeywordManipulatePanel);
