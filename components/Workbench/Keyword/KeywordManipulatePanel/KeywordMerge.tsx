import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { Box, ButtonTransparent, Flex } from 'components/General';
import MergeKeywordButton from './MergeKeywordButton';
import QuestionMerge from './QuestionMerge';
import KeywordPanelKeywords from '../shared/KeywordPanelKeywords';

import {
  StateType,
  ActionContentType,
  ReplayKeywordType,
} from 'reducers/types';
import { KeywordMergeProps } from './types';
import SetMergeToBox from './SetMergeToBox';
import { filterNeighbor } from 'common/replay';
import { counter } from '../common';

const KeywordMerge = ({
  keywordKeys,
  filteredDialogues,
  keywordToMerge,
  secondKeywords,
  mergeKeyword,
}: KeywordMergeProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <React.Fragment>
      <Flex flexWrap="wrap">
        <KeywordPanelKeywords width={1 / 2}>
          {keywordKeys.map(keyword => (
            <MergeKeywordButton
              key={`merge-left-${keyword[0]}`}
              keyword={keyword[0]}
              count={keyword[1]}
              index={0}
            />
          ))}
        </KeywordPanelKeywords>
        <KeywordPanelKeywords width={1 / 2}>
          {secondKeywords.map(keyword => (
            <MergeKeywordButton
              key={`merge-right-${keyword[0]}`}
              keyword={keyword[0]}
              count={keyword[1]}
              index={1}
            />
          ))}
        </KeywordPanelKeywords>
      </Flex>
      <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
        <SetMergeToBox />
      </Box>
      {keywordToMerge[0] && keywordToMerge[1] && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredDialogues.map(dialogue => (
            <QuestionMerge
              key={`question-merge-${dialogue.id}`}
              dialogue={dialogue}
            />
          ))}
        </Box>
      )}
      {keywordToMerge[0] && keywordToMerge[1] && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          <Box
            bg="orange.3"
            mx="auto"
            my={1}
            width={[1 / 2, 1 / 3, 1 / 4]}
            borderRadius={1}
          >
            <ButtonTransparent width={1} p={1} onClick={() => mergeKeyword()}>
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
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToMerge,
  (dialogues, keywordToMerge) =>
    keywordToMerge[0] === null || keywordToMerge[1] === null
      ? []
      : dialogues.filter(dialogue =>
          filterNeighbor(
            dialogue.question_keywords,
            (item, index) => item.name === keywordToMerge[index],
            keywordToMerge.length,
          ),
        ),
);

const availableSecondKeywordsSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToMerge[0],
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (firstKeyword, dialogues) => {
    const secondKeywords = [] as Array<ReplayKeywordType>;
    if (!firstKeyword) return [];
    dialogues.forEach(dialogue => {
      let prevIsFirstKeyword = false;
      dialogue.question_keywords.forEach(keyword => {
        if (keyword.name === firstKeyword) {
          prevIsFirstKeyword = true;
        } else if (prevIsFirstKeyword) {
          secondKeywords.push(keyword);
          prevIsFirstKeyword = false;
        }
      });
    });
    const keywordCounter = counter(secondKeywords);
    return Object.entries(keywordCounter).sort((a, b) => b[1] - a[1]);
  },
);

const mapStateToProps = (state: StateType) => ({
  keywordKeys: keywordKeysSelector(state),
  filteredDialogues: questionKeywordFilterSelector(state),
  keywordToMerge: addReplayReducer.rootSelector(state).keywordToMerge,
  secondKeywords: availableSecondKeywordsSelector(state),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  mergeKeyword: (fromQuestionId?: number) =>
    dispatch(addReplayReducer.actions.mergeKeyword(fromQuestionId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(KeywordMerge);
