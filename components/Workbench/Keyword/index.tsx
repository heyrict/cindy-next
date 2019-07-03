import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Query } from 'react-apollo';
import { PUZZLE_DIALOGUE_QUERY } from 'graphql/Queries/Puzzles';

import { getKeywords } from './common';

import { Flex } from 'components/General';
import KuromojiProgress from './KuromojiProgress';
import KeywordManipulatePanel from './KeywordManipulatePanel';

import { ActionContentType, ReplayDialogueType } from 'reducers/types';
import { KeywordWorkbenchProps } from './types';
import {
  PuzzleDialogueQuery,
  PuzzleDialogueQueryVariables,
} from 'graphql/Queries/generated/PuzzleDialogueQuery';

const KeywordWorkbench = ({
  id,
  setReplayDialogues,
  setKuromojiProgress,
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
        setKuromojiProgress(0);
        for (let i = 0; i < sui_hei_dialogue.length; i++) {
          const dialogue = sui_hei_dialogue[i];
          const parsed = await getKeywords(dialogue.question);
          calcDialogueKeys.push({
            id: dialogue.id,
            question: dialogue.question,
            question_keywords: parsed,
          });
          if ((i + 1) % 100 === 0)
            setKuromojiProgress((i + 1) / sui_hei_dialogue.length);
        }

        setKuromojiProgress(1);
        setReplayDialogues(calcDialogueKeys);
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return 'Loading...';
        }
        if (error) {
          toast.error(error.message);
          return null;
        }
        if (data && data.sui_hei_dialogue)
          return (
            <React.Fragment>
              <KuromojiProgress />
              <KeywordManipulatePanel />
            </React.Fragment>
          );
        return null;
      }}
    </Query>
  </Flex>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setReplayDialogues: (data: Array<ReplayDialogueType>) =>
    dispatch(addReplayReducer.actions.setReplayDialogues(data)),
  setKuromojiProgress: (percentage: number) =>
    dispatch(addReplayReducer.actions.setKuromojiProgress(percentage)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordWorkbench);
