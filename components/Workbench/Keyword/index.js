import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Query } from 'react-apollo';
import { PUZZLE_DIALOGUE_QUERY } from 'graphql/Queries/Puzzles';

import { getKeywords, counter } from './common';

import { Flex, ProgressBar } from 'components/General';
import KuromojiProgress from './KuromojiProgress';
import KeywordManipulatePanel from './KeywordManipulatePanel';
import ResultPreview from './ResultPreview';

const KeywordWorkbench = ({
  id,
  minKeywordAppearance,
  setCountFilterInput,
  setReplayDialogues,
  setKuromojiProgress,
  setKeywords,
  setUseKeywords,
}) => (
  <Flex p={2} flexWrap="wrap">
    <Query
      query={PUZZLE_DIALOGUE_QUERY}
      variables={{
        id,
      }}
      ssr={false}
      onCompleted={async ({ sui_hei_dialogue }) => {
        // Get keys
        const calcDialogueKeys = [];
        let keywordCounts = new Object();
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

        const keywords = new Object();
        const countThresh = Math.log10(calcDialogueKeys.length);
        setCountFilterInput(Math.ceil(countThresh));
        Object.entries(keywordCounts).forEach(([key, count]) => {
          keywords[key] = {
            count,
            use: count > countThresh ? true : false,
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

KeywordWorkbench.propTypes = {
  id: PropTypes.number.isRequired,
  setReplayDialogues: PropTypes.func.isRequired,
  setKuromojiProgress: PropTypes.func.isRequired,
  setKeywords: PropTypes.func.isRequired,
  setUseKeywords: PropTypes.func.isRequired,
  minKeywordAppearance: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  setReplayDialogues: data =>
    dispatch(addReplayReducer.actions.setReplayDialogues(data)),
  setCountFilterInput: value =>
    dispatch(addReplayReducer.actions.setCountFilterInput(value)),
  setKuromojiProgress: percentage =>
    dispatch(addReplayReducer.actions.setKuromojiProgress(percentage)),
  setKeywords: data => dispatch(addReplayReducer.actions.setKeywords(data)),
  setUseKeywords: data =>
    dispatch(addReplayReducer.actions.setUseKeywords(data)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordWorkbench);
