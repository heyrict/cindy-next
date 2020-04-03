import React from 'react';
import { TOKENIZE_SERVER } from 'settings';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Query } from '@apollo/react-components';
import { PUZZLE_DIALOGUE_QUERY } from 'graphql/Queries/Puzzles';

import { counter } from './common';

import { Flex } from 'components/General';
import Loading from 'components/General/Loading';
import KuromojiProgress from './KuromojiProgress';
import ModeSelectPanel from './ModeSelectPanel';

import {
  ActionContentType,
  ReplayDialogueType,
  ReplayKeywordCounterType,
  TokenizeServerResponseType,
  TokenizeServerTokenType,
} from 'reducers/types';
import { KeywordWorkbenchProps } from './types';
import {
  PuzzleDialogueQuery,
  PuzzleDialogueQueryVariables,
} from 'graphql/Queries/generated/PuzzleDialogueQuery';

const KeywordWorkbench = ({
  id,
  setReplayDialogues,
  setKuromojiProgress,
  setCountFilterInput,
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
        let keywordCounts = new Object() as ReplayKeywordCounterType;

        // Step 1: Fetch tokenized dialouges from server
        setKuromojiProgress(0);
        const parsed_dialogues: TokenizeServerResponseType = await fetch(
          `${TOKENIZE_SERVER}/${id}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
        ).then(res => res.json());

        // Step 2: Build keyword tree from tokens
        setKuromojiProgress(0.5);
        for (let i = 0; i < parsed_dialogues.length; i++) {
          const parsed = parsed_dialogues[i];
          const dialogue = sui_hei_dialogue.find(d => d.id === parsed.id);
          if (!dialogue) continue;

          await counter(
            parsed.tokens.map((tokens: TokenizeServerTokenType) => ({
              name: tokens.text,
            })),
            keywordCounts,
          );
          calcDialogueKeys.push({
            id: dialogue.id,
            qno: dialogue.qno,
            question: dialogue.question,
            question_keywords: parsed.tokens.map(
              (token: TokenizeServerTokenType) => ({ name: token.text }),
            ),
          });
          if ((i + 1) % 10 === 0)
            setKuromojiProgress(
              ((i + 1) * 0.5) / sui_hei_dialogue.length + 0.5,
            );
        }

        const keywords = new Object() as ReplayKeywordCounterType;
        const countThresh = Math.log10(calcDialogueKeys.length);
        setCountFilterInput(Math.ceil(countThresh));
        Object.entries(keywordCounts).forEach(([key, stat]) => {
          keywords[key] = stat;
        });

        // TODO Step 3: Build tf-idf object, calculate value for each document and
        //              pick the first 3 - 4 tokens with most value.

        setKuromojiProgress(1);
        setReplayDialogues(calcDialogueKeys);
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <>Error: ${error.message}</>;
        if (!data || !data.sui_hei_dialogue) {
          if (loading) return <Loading centered />;
          return null;
        }
        return (
          <React.Fragment>
            <KuromojiProgress />
            <ModeSelectPanel />
          </React.Fragment>
        );
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
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordWorkbench);
