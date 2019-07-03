import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';
import commonMessages from 'messages/common';

import { Flex, Box, ButtonTransparent } from 'components/General';
import SelectKeywordButton from './SelectKeywordButton';

import { StateType, ActionContentType } from 'reducers/types';
import { KeywordSelectProps } from './types';
import KeywordPanelKeywords from '../shared/KeywordPanelKeywords';
import KeywordPanel from '../shared/KeywordPanel';
import KeywordBox from '../shared/KeywordBox';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';
import { KeywordType } from '../shared/types';

const KeywordSelect = ({
  keywordKeys,
  filteredDialogues,
  keywordFilter,
  removeKeyword,
}: KeywordSelectProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <KeywordPanel>
      <Box fontSize={3}>
        <FormattedMessage {...messages.keywords} />
      </Box>
      <KeywordPanelKeywords>
        {keywordKeys.map(keyword => (
          <SelectKeywordButton
            key={`keyword-select-${keyword[0]}`}
            keyword={keyword[0]}
            count={keyword[1]}
          />
        ))}
      </KeywordPanelKeywords>
      {keywordFilter && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredDialogues.map(question => (
            <Flex
              width={1}
              mb={2}
              flexWrap="wrap"
              key={`question-delete-${question.id}`}
            >
              <KeywordQuestionBox>{question.question}</KeywordQuestionBox>
              {question.question_keywords.map((keyword, index) => (
                <KeywordBox
                  key={`${question.id}-${index}-${keyword.name}`}
                  keywordType={
                    keyword.name === keywordFilter
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
                  onClick={() => removeKeyword(keywordFilter, question.id)}
                >
                  <FormattedMessage {...commonMessages.apply} />
                </ButtonTransparent>
              </Box>
            </Flex>
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
              onClick={() => removeKeyword(keywordFilter)}
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
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToSelect,
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
  keywordFilter: addReplayReducer.rootSelector(state).keywordToSelect,
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
