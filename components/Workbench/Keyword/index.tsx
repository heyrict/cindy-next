import React from 'react';
import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Query } from 'react-apollo';
import { PUZZLE_DIALOGUE_QUERY } from 'graphql/Queries/Puzzles';

import { getKeywords, counter } from './common';

import { Flex } from 'components/General';
import KuromojiProgress from './KuromojiProgress';
import KeywordManipulatePanel from './KeywordManipulatePanel';
import ResultPreview from './ResultPreview';

import {
  ActionContentType,
  ReplayDialogueType,
  ReplayKeywordsType,
} from 'reducers/types';
import { KeywordWorkbenchProps } from './types';
import {
  PuzzleDialogueQuery,
  PuzzleDialogueQueryVariables,
} from 'graphql/Queries/generated/PuzzleDialogueQuery';

const KeywordWorkbench = ({
  id,
  setCountFilterInput,
  setReplayDialogues,
  setKuromojiProgress,
  setKeywords,
}: KeywordWorkbenchProps) => (
  <Flex p={2} flexWrap="wrap">
    <Query<PuzzleDialogueQuery, PuzzleDialogueQueryVariables>
      query={PUZZLE_DIALOGUE_QUERY}
      variables={{
        id,
      }}
      ssr={false}
      onCompleted={async ({ sui_hei_dialogue }) => {
        // Get keys
        const calcDialogueKeys = [] as Array<ReplayDialogueType>;
        let keywordCounts = new Object() as ReplayKeywordsType;
        setKuromojiProgress(0);
        for (let i = 0; i < sui_hei_dialogue.length; i++) {
          const dialogue = sui_hei_dialogue[i];
          const parsed = await getKeywords(dialogue.question);
          await counter(parsed, keywordCounts);
          calcDialogueKeys.push({
            question: dialogue.question,
            question_keywords: parsed,
          });
          if ((i + 1) % 10 === 0)
            setKuromojiProgress((i + 1) / sui_hei_dialogue.length);
        }

        const keywords = new Object() as ReplayKeywordsType;
        const countThresh = Math.log10(calcDialogueKeys.length);
        setCountFilterInput(Math.ceil(countThresh));
        Object.entries(keywordCounts).forEach(([key, stat]) => {
          keywords[key] = {
            count: stat.count,
            use: stat.count > countThresh ? true : false,
          };
        });

        setKuromojiProgress(1);
        setReplayDialogues(calcDialogueKeys);
        setKeywords(keywords);
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error: ${error.message}`;
        if (data && data.sui_hei_dialogue)
          return (
            <React.Fragment>
              <KuromojiProgress />
              <KeywordManipulatePanel />
              <ResultPreview />
            </React.Fragment>
          );
        return null;
      }}
    </Query>
  </Flex>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setReplayDialogues: (data: Array<ReplayDialogueType>) =>
    dispatch(addReplayReducer.actions.replayDialogues.set(data)),
  setCountFilterInput: (value: number) =>
    dispatch(addReplayReducer.actions.countFilterInput.set(value)),
  setKuromojiProgress: (percentage: number) =>
    dispatch(addReplayReducer.actions.kuromojiProgress.set(percentage)),
  setKeywords: (data: ReplayKeywordsType) =>
    dispatch(addReplayReducer.actions.keywords.set(data)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordWorkbench);
