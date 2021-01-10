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
import {Status, Yami} from 'generated/globalTypes';

const PuzzleDialogues = ({
  puzzleId,
  puzzleUser,
  puzzleYami,
  userId,
  anonymous,
  puzzleStatus,
}: PuzzleDialoguesProps) => {
  // Should remain in subscription if puzzle finished just now
  const [shouldSubscribe, setShouldSubscribe] = useState(puzzleStatus === Status.UNDERGOING);

  useEffect(() => {
    if (puzzleStatus === Status.UNDERGOING) {
      setShouldSubscribe(true);
    }
    return () => setShouldSubscribe(false);
  }, []);

  if (puzzleYami === Yami.NONE) {
    // Query all
    return (
      <PuzzleDialoguesRenderer
        variables={{
          puzzleId,
        }}
        shouldSubscribe={shouldSubscribe}
        puzzleUser={puzzleUser}
        puzzleYami={puzzleYami}
        anonymous={anonymous}
        puzzleStatus={puzzleStatus}
      />
    );
  }

  if (puzzleStatus === Status.UNDERGOING && !userId) {
    // Don't show anything in unsolved puzzle if user does not login
    return null;
  }

  if (puzzleUser.id === userId) {
    // For Unsolved yami, current user is creator: Query all, but filter by users
    return (
      <PuzzleDialoguesRenderer
        variables={{
          puzzleId,
        }}
        shouldSubscribe={shouldSubscribe}
        puzzleUser={puzzleUser}
        puzzleStatus={puzzleStatus}
        puzzleYami={puzzleYami}
        anonymous={anonymous}
        applyUserFilter
      />
    );
  }

  if (puzzleStatus === Status.UNDERGOING) {
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
        puzzleStatus={puzzleStatus}
        puzzleYami={puzzleYami}
        anonymous={anonymous}
        updateSolvedLongTermYamiOnSubscribe={puzzleYami === Yami.LONGTERM}
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
