import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Box } from 'components/General';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import PuzzleTitle from './PuzzleTitle';
import ContentsFrame from './ContentsFrame';
import AddQuestionInput from './AddQuestionInput';
import PuzzleDialogues from './PuzzleDialogues';

const PuzzleDetail = ({ puzzle, userId }) => {
  let puzzleContent;
  const isHidden = puzzle.status === 3;
  const isForbidden = puzzle.status === 4;
  const isCreator = puzzle.sui_hei_user.id === userId;
  const shouldShowQuestions = !isForbidden;
  const shouldShowAnswer = puzzle.status === 1 || puzzle.status === 2;
  const shouldShowAddQuestionInput = puzzle.status === 0 && !isCreator;

  //const shouldShowPuzzleDialogues = (isCreator || !isHidden) && !isForbidden;
  //
  // Remove dialogues in yami puzzles for now
  // TODO Load dialogues filtered by user (also unique users) in yami if is not puzzle creator.
  const shouldShowPuzzleDialogues =
    (isCreator || !isHidden) && !isForbidden && puzzle.yami === 0;

  if (isHidden && !isCreator) {
    puzzleContent = (
      <Box>
        <FormattedMessage {...messages.hiddenContents} />
      </Box>
    );
  } else if (isForbidden) {
    puzzleContent = (
      <Box>
        <FormattedMessage {...messages.forbiddenContents} />
      </Box>
    );
  } else {
    puzzleContent = puzzle.content;
  }

  return (
    <React.Fragment>
      <Flex justifyContent="center" flexWrap="wrap" mb={4}>
        <PuzzleTitle
          title={puzzle.title}
          genre={puzzle.genre}
          yami={puzzle.yami}
        />
        <ContentsFrame
          text={puzzleContent}
          anonymous={puzzle.anonymous}
          status={puzzle.status}
          user={puzzle.sui_hei_user}
          created={puzzle.created}
          solved={puzzle.modified}
        />
        {shouldShowPuzzleDialogues && (
          <PuzzleDialogues
            puzzleId={puzzle.id}
            puzzleUser={puzzle.sui_hei_user}
            userId={userId}
            anonymous={puzzle.anonymous}
            status={puzzle.status}
          />
        )}
        {shouldShowAddQuestionInput && (
          <AddQuestionInput puzzleId={puzzle.id} />
        )}
        {shouldShowAnswer && (
          <ContentsFrame
            text={puzzle.solution}
            status={puzzle.status}
            user={puzzle.sui_hei_user}
          />
        )}
      </Flex>
    </React.Fragment>
  );
};

PuzzleDetail.propTypes = {
  puzzle: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  userId: PropTypes.number,
};

const mapStateToProps = state => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDetail);
