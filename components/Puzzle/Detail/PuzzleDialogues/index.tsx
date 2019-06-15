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

import { Query } from 'react-apollo';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';

import PuzzleDialoguesRenderer from './PuzzleDialoguesRenderer';
import PuzzleDialoguesUserDeduplicator from './PuzzleDialoguesUserDeduplicator';

import { PuzzleDialoguesProps } from './types';

const PuzzleDialogues = ({
  puzzleId,
  puzzleUser,
  puzzleYami,
  userId,
  anonymous,
  puzzleStatus,
}: PuzzleDialoguesProps) => {
  // Should remain in subscription if puzzle finished just now
  const [shouldSubscribe, setShouldSubscribe] = useState(false);

  useEffect(() => {
    if (puzzleStatus === 0) {
      setShouldSubscribe(true);
    }
    return () => setShouldSubscribe(false);
  }, []);

  if (puzzleStatus === 0 && !userId) {
    // Don't show anything in unsolved puzzle if user does not login
    return null;
  }

  if (puzzleYami === 0) {
    // Query all
    return (
      <Query<DialogueHintQuery, DialogueHintQueryVariables>
        query={DIALOGUE_HINT_QUERY}
        variables={{
          puzzleId,
        }}
        fetchPolicy="cache-and-network"
      >
        {queryResult => (
          <PuzzleDialoguesRenderer
            {...queryResult}
            shouldSubscribe={shouldSubscribe}
            puzzleId={puzzleId}
            puzzleUser={puzzleUser}
            anonymous={anonymous}
            puzzleStatus={puzzleStatus}
          />
        )}
      </Query>
    );
  }

  if (puzzleYami !== 0 && puzzleUser.id === userId) {
    // For Unsolved yami, current user is creator: Query all, but filter by users
    return (
      <Query<DialogueHintQuery, DialogueHintQueryVariables>
        query={DIALOGUE_HINT_QUERY}
        variables={{
          puzzleId,
        }}
        fetchPolicy="cache-and-network"
      >
        {queryResult => (
          <PuzzleDialoguesRenderer
            {...queryResult}
            shouldSubscribe={shouldSubscribe}
            puzzleId={puzzleId}
            puzzleUser={puzzleUser}
            anonymous={anonymous}
            puzzleStatus={puzzleStatus}
            applyUserFilter
          />
        )}
      </Query>
    );
  }

  if (puzzleStatus === 0) {
    // Unsolved yami: Query only dialogues by current user
    return (
      <Query<DialogueHintQuery, DialogueHintQueryVariables>
        query={DIALOGUE_HINT_QUERY}
        variables={{
          puzzleId,
          userId,
        }}
        fetchPolicy="cache-and-network"
      >
        {queryResult => (
          <PuzzleDialoguesRenderer
            {...queryResult}
            shouldSubscribe={shouldSubscribe}
            puzzleId={puzzleId}
            puzzleUser={puzzleUser}
            anonymous={anonymous}
            puzzleStatus={puzzleStatus}
          />
        )}
      </Query>
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

export default PuzzleDialogues;
