import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { Box, ButtonTransparent } from 'components/General';
import RenameKeywordButton from './RenameKeywordButton';
import QuestionRename from './QuestionRename';
import KeywordPanelKeywords from '../shared/KeywordPanelKeywords';

import { StateType, ActionContentType } from 'reducers/types';
import { KeywordRenameProps } from './types';
import SetRenameToBox from './SetRenameToBox';

const KeywordRename = ({
  keywordKeys,
  filteredDialogues,
  keywordToRename,
  renameKeyword,
}: KeywordRenameProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <React.Fragment>
      <KeywordPanelKeywords>
        {keywordKeys.map(keyword => (
          <RenameKeywordButton
            key={`keyword-rename-${keyword[0]}`}
            keyword={keyword[0]}
            count={keyword[1]}
          />
        ))}
      </KeywordPanelKeywords>
      <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
        <SetRenameToBox />
      </Box>
      {keywordToRename && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredDialogues.map(dialogue => (
            <QuestionRename
              key={`question-rename-${dialogue.id}`}
              dialogue={dialogue}
            />
          ))}
        </Box>
      )}
      {keywordToRename && (
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
              onClick={() => renameKeyword(keywordToRename)}
            >
              <FormattedMessage {...commonMessages.applyToAll} />
            </ButtonTransparent>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

// Sort keys from keywordCounter
const keywordKeysFilter = createSelector(
  (state: StateType) =>
    Object.entries(addReplayReducer.rootSelector(state).keywordCounter),
  (state: StateType) => addReplayReducer.rootSelector(state).keywordFilter,
  (keywordCounter, keywordFilter) =>
    keywordFilter.trim() === ''
      ? keywordCounter
      : keywordCounter.filter(c => c[0].search(keywordFilter) >= 0),
);

const keywordKeysSelector = createSelector(
  (state: StateType) => keywordKeysFilter(state),
  keywordCounter => keywordCounter.sort((a, b) => b[1] - a[1]),
);

// Get questions with selected keyword
const questionKeywordFilterSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToEdit,
  (dialogues, keywordToRename) =>
    keywordToRename === null
      ? []
      : dialogues.filter(dialogue =>
          dialogue.question_keywords.some(k => k.name === keywordToRename),
        ),
);

const mapStateToProps = (state: StateType) => ({
  keywordKeys: keywordKeysSelector(state),
  filteredDialogues: questionKeywordFilterSelector(state),
  keywordToRename: addReplayReducer.rootSelector(state).keywordToEdit,
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
