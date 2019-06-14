import React from 'react';

import { Flex, Box } from 'components/General';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import PuzzleTitle from './PuzzleTitle';
import ContentsFrame from './ContentsFrame';
import AddQuestionInput from './AddQuestionInput';
import PuzzleDialogues from './PuzzleDialogues';
import StarPanel from './StarPanel';
import CommentPanel from './CommentPanel';
import BookmarkPanel from './BookmarkPanel';
import ReplayPanel from './ReplayPanel';
import ControlPanel from './ControlPanel';

import { StateType } from 'reducers/types';
import { PuzzleDetailProps } from './types';

const PuzzleDetail = ({ puzzle, userId }: PuzzleDetailProps) => {
  let puzzleContent;
  const isUser = Boolean(userId);
  const isHidden = puzzle.status === 3;
  const isForbidden = puzzle.status === 4;
  const isCreator = puzzle.sui_hei_user.id === userId;
  const shouldShowAnswer = puzzle.status === 1 || puzzle.status === 2;
  const shouldShowAddQuestionInput =
    puzzle.status === 0 && !isCreator && isUser;
  const shouldShowPuzzleDialogues = (isCreator || !isHidden) && !isForbidden;

  const shouldShowStarPanel = shouldShowAnswer && !isCreator;
  const shouldShowCommentPanel = shouldShowAnswer && !isCreator;
  const shouldShowBookmarkPanel = shouldShowAnswer;
  const shouldShowReplayPanel = shouldShowAnswer;

  const shouldShowControlPanel = isCreator;

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
            puzzleStatus={puzzle.status}
            puzzleYami={puzzle.yami}
            userId={userId}
            anonymous={puzzle.anonymous}
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
        {shouldShowStarPanel && <StarPanel puzzleId={puzzle.id} />}
        {shouldShowCommentPanel && <CommentPanel puzzleId={puzzle.id} />}
        {shouldShowBookmarkPanel && <BookmarkPanel puzzleId={puzzle.id} />}
        {shouldShowReplayPanel && <ReplayPanel puzzleId={puzzle.id} />}
        {shouldShowControlPanel && <ControlPanel puzzle={puzzle} />}
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDetail);
