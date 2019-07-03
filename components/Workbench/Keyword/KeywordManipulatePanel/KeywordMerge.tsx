import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';
import commonMessages from 'messages/common';

import { Box, ButtonTransparent, Flex } from 'components/General';
import MergeKeywordButton from './MergeKeywordButton';
import QuestionMerge from './QuestionMerge';
import KeywordPanelKeywords from '../shared/KeywordPanelKeywords';
import KeywordPanel from '../shared/KeywordPanel';

import { StateType, ActionContentType } from 'reducers/types';
import { KeywordMergeProps } from './types';
import SetMergeToBox from './SetMergeToBox';
import { filterNeighbor } from 'common/replay';

const KeywordMerge = ({
  keywordKeys,
  filteredDialogues,
  keywordFilter,
  mergeKeyword,
}: KeywordMergeProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <KeywordPanel>
      <Box fontSize={3} width={1}>
        <FormattedMessage {...messages.keywords} />
      </Box>
      <Flex flexWrap="wrap">
        <KeywordPanelKeywords width={1 / 2}>
          {keywordKeys.map(keyword => (
            <MergeKeywordButton
              key={keyword[0]}
              keyword={keyword[0]}
              count={keyword[1]}
              index={0}
            />
          ))}
        </KeywordPanelKeywords>
        <KeywordPanelKeywords width={1 / 2}>
          {keywordKeys.map(keyword => (
            <MergeKeywordButton
              key={keyword[0]}
              keyword={keyword[0]}
              count={keyword[1]}
              index={1}
            />
          ))}
        </KeywordPanelKeywords>
      </Flex>
      {keywordFilter[0] && keywordFilter[1] && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          <SetMergeToBox />
        </Box>
      )}
      {keywordFilter[0] && keywordFilter[1] && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredDialogues.map(dialogue => (
            <QuestionMerge dialogue={dialogue} />
          ))}
        </Box>
      )}
      {keywordFilter[0] && keywordFilter[1] && (
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
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToMerge,
  (dialogues, keywordFilter) =>
    keywordFilter[0] === null || keywordFilter[1] === null
      ? []
      : dialogues.filter(dialogue =>
          filterNeighbor(
            dialogue.question_keywords,
            (item, index) => item.name === keywordFilter[index],
            keywordFilter.length,
          ),
        ),
);

const mapStateToProps = (state: StateType) => ({
  keywordKeys: keywordKeysSelector(state),
  filteredDialogues: questionKeywordFilterSelector(state),
  keywordFilter: addReplayReducer.rootSelector(state).keywordToMerge,
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
