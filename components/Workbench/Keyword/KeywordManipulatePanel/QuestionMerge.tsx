import React from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Flex, Box, ButtonTransparent } from 'components/General';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import KeywordBox from '../shared/KeywordBox';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';
import { QuestionMergeProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';
import { KeywordType } from '../shared/types';

const QuestionMerge = ({
  dialogue,
  keywordFilter,
  mergeTo,
  mergeKeyword,
}: QuestionMergeProps) => (
  <Flex width={1} mb={2} flexWrap="wrap" key={dialogue.id}>
    <KeywordQuestionBox qno={dialogue.qno}>
      {dialogue.question}
    </KeywordQuestionBox>
    {dialogue.question_keywords.map((keyword, index) => {
      const shouldMerge = keywordFilter.some(kw => keyword.name === kw);
      const shouldShowNew =
        keywordFilter[keywordFilter.length - 1] === keyword.name;
      return (
        <React.Fragment
          key={`question-merge-keyword-${dialogue.id}-${index}-${keyword.name}`}
        >
          <KeywordBox
            keywordType={
              shouldMerge ? KeywordType.TO_DELETE : KeywordType.DEFAULT
            }
          >
            {keyword.name}
          </KeywordBox>
          {shouldShowNew && (
            <KeywordBox keywordType={KeywordType.TO_ADD}>
              {mergeTo || `${keywordFilter[0]}${keywordFilter[1]}`}
            </KeywordBox>
          )}
        </React.Fragment>
      );
    })}
    {keywordFilter[0] && keywordFilter[1] && (
      <Box bg="orange.3" ml="auto" borderRadius={1}>
        <ButtonTransparent
          fontSize="0.9em"
          onClick={() => mergeKeyword(dialogue.id)}
        >
          <FormattedMessage {...commonMessages.apply} />
        </ButtonTransparent>
      </Box>
    )}
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  keywordFilter: addReplayReducer.rootSelector(state).keywordToMerge,
  mergeTo: addReplayReducer.rootSelector(state).mergeTo,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  mergeKeyword: (fromQuestionId?: number) =>
    dispatch(addReplayReducer.actions.mergeKeyword(fromQuestionId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(QuestionMerge);
