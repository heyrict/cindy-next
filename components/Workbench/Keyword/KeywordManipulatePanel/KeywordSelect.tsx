import React from 'react';
import styled from 'theme/styled';
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

const KeywordPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.yellow[6]};
  border-radius: 0 0 ${p => p.theme.radii[2]}px ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: solid;
  padding: ${p => p.theme.space[2]}px;
  width: 100%;
  margin-bottom: ${p => p.theme.space[2]}px;
`;

const KeywordSelectWrapper = styled(Flex)`
  flex-wrap: wrap;
  border-top: 2px solid ${p => p.theme.colors.yellow[6]};
  padding-top: 0.5em;
  max-height: 15em;
  overflow-y: auto;
`;

const KeywordQuestionBox = styled.div`
  width: 100%;
  &:before {
    content: 'Q';
    margin-right: 0.5em;
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const KeywordBox = styled.div<{ toDelete: boolean }>`
  display: inline-box;
  ${p => p.toDelete && 'text-decoration-line: line-through;'}
  font-size: 0.9em;
  border: 2px solid
    ${p => (p.toDelete ? p.theme.colors.gray[3] : p.theme.colors.gray[5])};
  border-radius: 5px;
  margin: 2px 3px;
  background-color: ${p => p.theme.colors.gray[1]};
  color: ${p => (p.toDelete ? p.theme.colors.gray[6] : p.theme.colors.gray[8])};
`;

const KeywordSelect = ({
  keywordKeys,
  filteredQuestions,
  keywordFilter,
  removeKeyword,
}: KeywordSelectProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <KeywordPanel>
      <Box fontSize={3}>
        <FormattedMessage {...messages.keywords} />
      </Box>
      <KeywordSelectWrapper>
        {keywordKeys.map(keyword => (
          <SelectKeywordButton
            key={keyword[0]}
            keyword={keyword[0]}
            count={keyword[1]}
          />
        ))}
      </KeywordSelectWrapper>
      {keywordFilter && (
        <Box borderTop="2px solid" borderColor="yellow.6" pt={1}>
          {filteredQuestions.map(question => (
            <Flex width={1} mb={2} flexWrap="wrap" key={question.id}>
              <KeywordQuestionBox>{question.question}</KeywordQuestionBox>
              {question.question_keywords.map((keyword, index) => (
                <KeywordBox
                  key={`${question.id}-${index}-${keyword.name}`}
                  toDelete={keyword.name === keywordFilter}
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
  filteredQuestions: questionKeywordFilterSelector(state),
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
