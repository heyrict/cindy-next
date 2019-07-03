import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { Flex, Box, ButtonTransparent } from 'components/General';
import SelectKeywordButton from './SelectKeywordButton';

import { StateType, ActionContentType } from 'reducers/types';
import { KeywordSelectProps } from './types';
import KeywordPanelKeywords from '../shared/KeywordPanelKeywords';
import KeywordBox from '../shared/KeywordBox';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';
import { KeywordType } from '../shared/types';

const KeywordSelect = ({
  keywordKeys,
  filteredDialogues,
  keywordToSelect,
  removeKeyword,
}: KeywordSelectProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <React.Fragment>
      <KeywordPanelKeywords>
        {keywordKeys.map(keyword => (
          <SelectKeywordButton
            key={`keyword-select-${keyword[0]}`}
            keyword={keyword[0]}
            count={keyword[1]}
          />
        ))}
      </KeywordPanelKeywords>
      {keywordToSelect && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredDialogues.map(dialogue => (
            <Flex
              width={1}
              mb={2}
              flexWrap="wrap"
              key={`question-delete-${dialogue.id}`}
            >
              <KeywordQuestionBox qno={dialogue.qno}>
                {dialogue.question}
              </KeywordQuestionBox>
              {dialogue.question_keywords.map((keyword, index) => (
                <KeywordBox
                  key={`${dialogue.id}-${index}-${keyword.name}`}
                  keywordType={
                    keyword.name === keywordToSelect
                      ? KeywordType.TO_DELETE
                      : KeywordType.DEFAULT
                  }
                >
                  {keyword.name}
                </KeywordBox>
              ))}
              <Box bg="orange.3" ml="auto" borderRadius={1}>
                <ButtonTransparent
                  fontSize="0.9em"
                  onClick={() => removeKeyword(keywordToSelect, dialogue.id)}
                >
                  <FormattedMessage {...commonMessages.apply} />
                </ButtonTransparent>
              </Box>
            </Flex>
          ))}
        </Box>
      )}
      {keywordToSelect && (
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
              onClick={() => removeKeyword(keywordToSelect)}
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
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToSelect,
  (dialogues, keywordToSelect) =>
    keywordToSelect === null
      ? []
      : dialogues.filter(dialogue =>
          dialogue.question_keywords.some(k => k.name === keywordToSelect),
        ),
);

const mapStateToProps = (state: StateType) => ({
  keywordKeys: keywordKeysSelector(state),
  filteredDialogues: questionKeywordFilterSelector(state),
  keywordToSelect: addReplayReducer.rootSelector(state).keywordToSelect,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  removeKeyword: (keyword: string, fromQuestionId?: number) =>
    dispatch(addReplayReducer.actions.removeKeyword(keyword, fromQuestionId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(KeywordSelect);
