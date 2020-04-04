import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/react-hooks';
import { TOKENIZE_SERVER } from 'settings';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { PUZZLE_REPLAY_INFO_QUERY } from 'graphql/Queries/Puzzles';

import { counter } from './common';

import { Flex } from 'components/General';
import Loading from 'components/General/Loading';
import KuromojiProgress from './KuromojiProgress';
import ModeSelectPanel from './ModeSelectPanel';
import { Tfidf } from './tfidf';

import {
  ActionContentType,
  ReplayDialogueType,
  ReplayKeywordCounterType,
  TokenizeServerResponseType,
  TokenizeServerTokenType,
} from 'reducers/types';
import { KeywordWorkbenchProps } from './types';
import {
  PuzzleReplayInfoQuery,
  PuzzleReplayInfoQueryVariables,
} from 'graphql/Queries/generated/PuzzleReplayInfoQuery';

const SAVE_INTERVAL = 60000;

const KeywordWorkbench = ({
  id,
  setReplayDialogues,
  setKuromojiProgress,
  setCountFilterInput,
  setTitle,
  saveStorage,
  loadStorage,
}: KeywordWorkbenchProps) => {
  const client = useApolloClient();

  useEffect(() => {
    let handle = window.setInterval(() => {
      saveStorage(id);
      toast.info('Autosaved', {
        toastId: 'workbench-keyword-autosave',
      });
    }, SAVE_INTERVAL);
    return () => window.clearInterval(handle);
  }, []);

  useEffect(() => {
    const init = () =>
      client
        .query<PuzzleReplayInfoQuery, PuzzleReplayInfoQueryVariables>({
          query: PUZZLE_REPLAY_INFO_QUERY,
          variables: { id },
        })
        .then(async ({ loading, errors, data }) => {
          if (errors) {
            toast.error(JSON.stringify(errors));
            return null;
          }
          if (!data || !data.sui_hei_puzzle_by_pk) {
            if (loading) return <Loading centered />;
            return null;
          }
          const sui_hei_dialogues = data.sui_hei_puzzle_by_pk.sui_hei_dialogues;
          setTitle(data.sui_hei_puzzle_by_pk.title);

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

          // Step 2: Build tf-idf object, calculate value for each document and
          //         pick the first 3 - 4 tokens with most value.
          setKuromojiProgress(0.33);
          const tfidf = new Tfidf({ docs: parsed_dialogues });

          // Step 3: Build keyword tree from tokens
          setKuromojiProgress(0.66);
          for (let i = 0; i < parsed_dialogues.length; i++) {
            const parsed = parsed_dialogues[i];
            const dialogue = sui_hei_dialogues.find(d => d.id === parsed.id);
            const tokens = parsed.tokens.map(
              (tokens: TokenizeServerTokenType) => ({
                name: tokens.text,
                tfidf_index: tfidf.get_tfidf_value(parsed.id, tokens.text) || 0,
              }),
            );
            if (!dialogue) continue;

            counter(tokens, keywordCounts);
            calcDialogueKeys.push({
              id: dialogue.id,
              qno: dialogue.qno,
              question: dialogue.question,
              answer: dialogue.answer,
              good: dialogue.good,
              true: dialogue.true,
              milestones: [],
              dependency: '',
              question_keywords: tokens,
            });
            if ((i + 1) % 10 === 0)
              setKuromojiProgress(
                ((i + 1) * 0.33) / sui_hei_dialogues.length + 0.66,
              );
          }

          const keywords = new Object() as ReplayKeywordCounterType;
          const countThresh = Math.log10(calcDialogueKeys.length);
          setCountFilterInput(Math.ceil(countThresh));
          Object.entries(keywordCounts).forEach(([key, stat]) => {
            keywords[key] = stat;
          });

          setKuromojiProgress(1);
          setReplayDialogues(calcDialogueKeys);
        });
    loadStorage(id, init);
  }, [id]);

  return (
    <Flex p={2} flexWrap="wrap">
      <KuromojiProgress />
      <ModeSelectPanel />
    </Flex>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setReplayDialogues: (data: Array<ReplayDialogueType>) => {
    dispatch(addReplayReducer.actions.replayDialogues.set(data));
    dispatch(addReplayReducer.actions.updateKeywordCounter());
  },
  setCountFilterInput: (value: number) =>
    dispatch(addReplayReducer.actions.countFilterInput.set(value)),
  setKuromojiProgress: (percentage: number) =>
    dispatch(addReplayReducer.actions.kuromojiProgress.set(percentage)),
  setTitle: (title: string) =>
    dispatch(addReplayReducer.actions.title.set(title)),
  loadStorage: (id: number, init: () => Promise<any>) =>
    dispatch(addReplayReducer.actions.loadStorage(id, init)),
  saveStorage: (id: number) =>
    dispatch(addReplayReducer.actions.saveStorage(id)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordWorkbench);
