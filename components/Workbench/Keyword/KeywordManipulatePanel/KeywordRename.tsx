import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';
import commonMessages from 'messages/common';

import { Box, ButtonTransparent } from 'components/General';
import RenameKeywordButton from './RenameKeywordButton';
import QuestionRename from './QuestionRename';
import KeywordPanelKeywords from '../shared/KeywordPanelKeywords';
import KeywordPanel from '../shared/KeywordPanel';

import { StateType, ActionContentType } from 'reducers/types';
import { KeywordRenameProps } from './types';
import SetRenameToBox from './SetRenameToBox';

const KeywordRename = ({
  keywordKeys,
  filteredDialogues,
  keywordFilter,
  renameKeyword,
}: KeywordRenameProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <KeywordPanel>
      <Box fontSize={3}>
        <FormattedMessage {...messages.keywords} />
      </Box>
      <KeywordPanelKeywords>
        {keywordKeys.map(keyword => (
          <RenameKeywordButton
            key={keyword[0]}
            keyword={keyword[0]}
            count={keyword[1]}
          />
        ))}
      </KeywordPanelKeywords>
      {keywordFilter && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          <SetRenameToBox />
        </Box>
      )}
      {keywordFilter && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredDialogues.map(dialogue => (
            <QuestionRename dialogue={dialogue} />
          ))}
        </Box>
      )}
      {keywordFilter && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          <Box
            bg="orange.3"
            mx="auto"
            my={1}
            width={[1 / 2, 1 / 3, 1 / 4]}
            borderRadius={1}
          >
            <ButtonTransparent
              width={1}
              p={1}
              onClick={() => renameKeyword(keywordFilter)}
            >
              <FormattedMessage {...commonMessages.applyToAll} />
            </ButtonTransparent>
          </Box>
        </Box>
      )}
    </KeywordPanel>
  );
};

// Sort keys from keywordCounter
const keywordKeysSelector = createSelector(
  (state: StateType) =>
    Object.entries(addReplayReducer.rootSelector(state).keywordCounter),
  keywordCounter => keywordCounter.sort((a, b) => b[1] - a[1]),
);

// Get questions with selected keyword
const questionKeywordFilterSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToEdit,
  (dialogues, keywordFilter) =>
    keywordFilter === null
      ? []
      : dialogues.filter(dialogue =>
          dialogue.question_keywords.some(k => k.name === keywordFilter),
        ),
);

const mapStateToProps = (state: StateType) => ({
  keywordKeys: keywordKeysSelector(state),
  filteredDialogues: questionKeywordFilterSelector(state),
  keywordFilter: addReplayReducer.rootSelector(state).keywordToEdit,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  renameKeyword: (keyword: string, fromQuestionId?: number) =>
    dispatch(addReplayReducer.actions.renameKeyword(keyword, fromQuestionId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(KeywordRename);
