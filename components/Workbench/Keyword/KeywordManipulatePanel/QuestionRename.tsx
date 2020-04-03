import React from 'react';
import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Flex, Box, ButtonTransparent } from 'components/General';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import KeywordBox from '../shared/KeywordBox';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';
import { QuestionRenameProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';
import { KeywordType } from '../shared/types';

const QuestionRename = ({
  dialogue,
  keywordToRename,
  renameTo,
  renameKeyword,
}: QuestionRenameProps) => (
  <Flex width={1} mb={2} flexWrap="wrap" key={dialogue.id}>
    <KeywordQuestionBox prefix={`Q${dialogue.qno}`}>
      {dialogue.question}
    </KeywordQuestionBox>
    {dialogue.question_keywords.map((keyword, index) => {
      const shouldRename = keyword.name === keywordToRename;
      return renameTo ? (
        <React.Fragment
          key={`question-rename-keywords-${dialogue.id}-${index}-${keyword.name}`}
        >
          <KeywordBox
            keywordType={
              shouldRename ? KeywordType.TO_DELETE : KeywordType.DEFAULT
            }
          >
            {keyword.name}
          </KeywordBox>
          {shouldRename && (
            <KeywordBox keywordType={KeywordType.TO_ADD}>{renameTo}</KeywordBox>
          )}
        </React.Fragment>
      ) : (
        <KeywordBox
          key={`question-rename-keywords-${dialogue.id}-${index}-${keyword.name}`}
          keywordType={KeywordType.DEFAULT}
        >
          {keyword.name}
        </KeywordBox>
      );
    })}
    {keywordToRename && (
      <Box bg="orange.3" ml="auto" borderRadius={1}>
        <ButtonTransparent
          fontSize="0.9em"
          onClick={() => renameKeyword(keywordToRename, dialogue.id)}
        >
          <FormattedMessage {...commonMessages.apply} />
        </ButtonTransparent>
      </Box>
    )}
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  keywordToRename: addReplayReducer.rootSelector(state).keywordToEdit,
  renameTo: addReplayReducer.rootSelector(state).renameTo,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  renameKeyword: (keyword: string, fromQuestionId?: number) =>
    dispatch(addReplayReducer.actions.renameKeyword(keyword, fromQuestionId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(QuestionRename);
