import React, { useEffect, useState, useRef } from 'react';

import { Flex, Box, ButtonTransparent } from 'components/General';
import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as puzzleReducer from 'reducers/puzzle';
import * as settingReducer from 'reducers/setting';

import { Modal } from 'components/Modal';
import PuzzleTitle from './PuzzleTitle';
import ContentsFrame from './ContentsFrame';
import ShareFrame from './ShareFrame';
import MemoFrame from './MemoFrame';
import AddQuestionInput from './AddQuestionInput';
import PuzzleDialogues from './PuzzleDialogues';
import StarPanel from './StarPanel';
import CommentPanel from './CommentPanel';
import BookmarkPanel from './BookmarkPanel';
import ControlPanel from './ControlPanel';
import PuzzleTags from './PuzzleTags';
import NotLoggedInMessage from './NotLoggedInMessage';

import { StateType, ActionContentType } from 'reducers/types';
import { PuzzleDetailProps } from './types';
import WithSolution from './WithSolution';
import JumpButtons from './JumpButtons';
import { Status, Yami } from 'generated/globalTypes';

const PuzzleDetail = ({
  puzzle,
  userId,
  showGrotesqueWarning,
  ignoredGrotesquePuzzles,
  pushIgnoredGrotesquePuzzles,
  setPuzzleContent,
  setPuzzleMemo,
  solvedLongtermYami,
  setFalseSolvedLongtermYami,
}: PuzzleDetailProps) => {
  const noMoreGrotesqueWarningInput = useRef<HTMLInputElement>(null!);

  let puzzleContent;
  const isUser = Boolean(userId);
  const isHidden = puzzle.status === Status.HIDDEN;
  const isForbidden = puzzle.status === Status.FORCE_HIDDEN;
  const isCreator = puzzle.user.id === userId;

  const shouldShowShare =
    puzzle.status === Status.UNDERGOING || puzzle.status === Status.SOLVED;
  const shouldShowTags = isCreator || (!isHidden && !isForbidden);
  const shouldShowMemo = puzzle.memo.trim() !== '';
  const shouldShowAnswer =
    puzzle.status === Status.SOLVED ||
    puzzle.status === Status.DAZED ||
    (puzzle.status === Status.HIDDEN && isCreator) ||
    solvedLongtermYami;
  const shouldShowAddQuestionInput =
    puzzle.status === Status.UNDERGOING && !isCreator && isUser;
  const shouldShowPuzzleDialogues = (isCreator || !isHidden) && !isForbidden;
  const shouldShowNotLoggedInMessage = !isUser;

  const shouldShowStarPanel = shouldShowAnswer;
  const shouldShowCommentPanel = shouldShowAnswer;
  const shouldShowBookmarkPanel = shouldShowAnswer;
  const shouldShowControlPanel = isCreator;

  const queryWithCurrentUserOnly = puzzle.yami !== Yami.NONE && !isCreator;

  const [showGrotesqueModal, setShowGrotesqueModal] = useState(false);

  useEffect(() => {
    if (!isHidden) {
      setPuzzleContent(puzzle.content);
      return () => setPuzzleContent('');
    }
  }, [puzzle.content, puzzle.status]);

  useEffect(() => {
    if (
      puzzle.grotesque &&
      showGrotesqueWarning &&
      ignoredGrotesquePuzzles.findIndex(id => id === puzzle.id) === -1
    ) {
      setShowGrotesqueModal(true);
    }
  }, [puzzle.grotesque]);

  useEffect(() => {
    setFalseSolvedLongtermYami();
  }, [puzzle.id]);

  useEffect(() => {
    setPuzzleMemo(puzzle.memo);
    return () => setPuzzleMemo('');
  }, [puzzle.memo]);

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

  const maybeSetPuzzleIgnored = () => {
    if (noMoreGrotesqueWarningInput.current.checked) {
      pushIgnoredGrotesquePuzzles(puzzle.id);
    }
  };

  return (
    <React.Fragment>
      <Flex justifyContent="center" flexWrap="wrap" mb="100px">
        <PuzzleTitle
          title={puzzle.title}
          genre={puzzle.genre}
          yami={puzzle.yami}
        />
        <JumpButtons puzzleId={puzzle.id} />
        <ContentsFrame
          text={puzzleContent}
          anonymous={puzzle.anonymous}
          status={puzzle.status}
          user={puzzle.user}
          created={puzzle.created}
          solved={
            puzzle.status === Status.UNDERGOING ? undefined : puzzle.modified
          }
        />
        {shouldShowShare && (
          <ShareFrame
            title={puzzle.title}
            content={puzzle.content}
            solved={puzzle.status === Status.UNDERGOING}
          />
        )}
        {shouldShowTags && (
          <PuzzleTags
            puzzleId={puzzle.id}
            puzzleUserId={puzzle.user.id}
            userId={userId}
          />
        )}
        {shouldShowMemo && <MemoFrame memo={puzzle.memo} />}
        {shouldShowPuzzleDialogues && (
          <PuzzleDialogues
            puzzleId={puzzle.id}
            puzzleUser={puzzle.user}
            puzzleStatus={puzzle.status}
            puzzleYami={puzzle.yami}
            userId={userId}
            anonymous={puzzle.anonymous}
          />
        )}
        {shouldShowAddQuestionInput && (
          <AddQuestionInput
            puzzleId={puzzle.id}
            userId={queryWithCurrentUserOnly ? userId : undefined}
          />
        )}
        {shouldShowAnswer && (
          <WithSolution puzzleId={puzzle.id}>
            {solution => (
              <ContentsFrame
                text={solution}
                status={puzzle.status}
                user={puzzle.user}
              />
            )}
          </WithSolution>
        )}
        {shouldShowNotLoggedInMessage && <NotLoggedInMessage />}
        {shouldShowStarPanel && (
          <StarPanel puzzleId={puzzle.id} canAddStar={!isCreator} />
        )}
        {shouldShowCommentPanel && (
          <CommentPanel
            puzzleId={puzzle.id}
            canAddComment={!isCreator}
            userId={userId}
          />
        )}
        {shouldShowBookmarkPanel && <BookmarkPanel puzzleId={puzzle.id} />}
        {shouldShowControlPanel && (
          <WithSolution puzzleId={puzzle.id}>
            {solution => <ControlPanel puzzle={{ ...puzzle, solution }} />}
          </WithSolution>
        )}
      </Flex>
      <Modal show={showGrotesqueModal}>
        <Flex pt={3} flexWrap="wrap" justifyContent="center">
          <Box width={1} py={4} fontSize={4} color="red.7" textAlign="center">
            <FormattedMessage {...messages.grotesqueWarning} />
          </Box>
          <Flex width={1} mt={2} justifyContent="center">
            <input
              style={{ margin: '0 1em' }}
              type="checkbox"
              ref={noMoreGrotesqueWarningInput}
            />
            <FormattedMessage {...commonMessages.noMoreWarning}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Flex>
          <Flex width={1} mt={2}>
            <Box width={1} bg="red.6">
              <ButtonTransparent
                p={2}
                width={1}
                color="red.0"
                onClick={() => window.history.back()}
              >
                <FormattedMessage {...commonMessages.back} />
              </ButtonTransparent>
            </Box>
            <Box width={1} bg="orange.6">
              <ButtonTransparent
                p={2}
                width={1}
                color="orange.0"
                onClick={() => {
                  maybeSetPuzzleIgnored();
                  setShowGrotesqueModal(false);
                }}
              >
                <FormattedMessage {...commonMessages.continue} />
              </ButtonTransparent>
            </Box>
          </Flex>
        </Flex>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
  solvedLongtermYami: puzzleReducer.rootSelector(state).solvedLongtermYami,
  showGrotesqueWarning: settingReducer.rootSelector(state).showGrotesqueWarning,
  ignoredGrotesquePuzzles: settingReducer.rootSelector(state)
    .ignoredGrotesquePuzzles,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setPuzzleContent: (content: string) =>
    dispatch(puzzleReducer.actions.puzzleContent.set(content)),
  setPuzzleMemo: (memo: string) =>
    dispatch(puzzleReducer.actions.puzzleMemo.set(memo)),
  setFalseSolvedLongtermYami: () =>
    dispatch(puzzleReducer.actions.solvedLongtermYami.setFalse()),
  pushIgnoredGrotesquePuzzles: (puzzleId: number) =>
    dispatch(settingReducer.actions.ignoredGrotesquePuzzles.push(puzzleId)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(PuzzleDetail);
