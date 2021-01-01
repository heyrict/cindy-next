/*
 * PuzzleDialogues
 *
 * judging which userId to query or subscribe with
 * `puzzleUser` `puzzleStatus` and `userId`
 *
 * If puzzleYami == None, normally return all.
 *
 * If puzzleStatus == Unsolved, restrict to use user's userId.
 *
 * If puzzleStatus == Solved, provide a way to switch userId.
 */

import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

import PuzzleDialoguesRenderer from './PuzzleDialoguesRenderer';
import PuzzleDialoguesUserDeduplicator from './PuzzleDialoguesUserDeduplicator';

import { PuzzleDialoguesProps } from './types';
import { ActionContentType } from 'reducers/types';

const PuzzleDialogues = ({
  puzzleId,
  puzzleUser,
  puzzleYami,
  userId,
  anonymous,
  puzzleStatus,
  setTrueSolvedLongtermYami,
}: PuzzleDialoguesProps) => {
  // Should remain in subscription if puzzle finished just now
  const [shouldSubscribe, setShouldSubscribe] = useState(puzzleStatus === 0);

  useEffect(() => {
    if (puzzleStatus === 0) {
      setShouldSubscribe(true);
    }
    return () => setShouldSubscribe(false);
  }, []);

  if (puzzleYami === 0) {
    // Query all
    return (
      <PuzzleDialoguesRenderer
        variables={{
          puzzleId,
        }}
        shouldSubscribe={shouldSubscribe}
        puzzleUser={puzzleUser}
        anonymous={anonymous}
        puzzleStatus={puzzleStatus}
      />
    );
  }

  if (puzzleStatus === 0 && !userId) {
    // Don't show anything in unsolved puzzle if user does not login
    return null;
  }

  if (puzzleYami !== 0 && puzzleUser.id === userId) {
    // For Unsolved yami, current user is creator: Query all, but filter by users
    return (
      <PuzzleDialoguesRenderer
        variables={{
          puzzleId,
        }}
        shouldSubscribe={shouldSubscribe}
        puzzleUser={puzzleUser}
        anonymous={anonymous}
        puzzleStatus={puzzleStatus}
        applyUserFilter
      />
    );
  }

  if (puzzleStatus === 0) {
    // Unsolved yami: Query only dialogues by current user
    // TODO on completed, setTrueSolvedLongtermYami();
    return (
      <PuzzleDialoguesRenderer
        variables={{
          puzzleId,
          userId,
        }}
        shouldSubscribe={shouldSubscribe}
        puzzleUser={puzzleUser}
        anonymous={anonymous}
        puzzleStatus={puzzleStatus}
        updateSolvedLongTermYamiOnSubscribe={puzzleYami === 2}
      />
    );
  }

  // Solved yami: Query filtered by participant
  return (
    <PuzzleDialoguesUserDeduplicator
      shouldSubscribe={shouldSubscribe}
      puzzleId={puzzleId}
      puzzleUser={puzzleUser}
      userId={userId}
      anonymous={anonymous}
      puzzleStatus={puzzleStatus}
    />
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueSolvedLongtermYami: () =>
    dispatch(puzzleReducer.actions.solvedLongtermYami.setTrue()),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(PuzzleDialogues);
