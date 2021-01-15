import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Query } from '@apollo/client/react/components';
import {
  PuzzleUniqueParticipantsQuery,
  PuzzleUniqueParticipantsQueryVariables,
} from 'graphql/Queries/generated/PuzzleUniqueParticipantsQuery';
import { PUZZLE_UNIQUE_PARTICIPANTS_QUERY } from 'graphql/Queries/Puzzles';

import Loading from 'components/General/Loading';
import UserFilterSwitcher from './UserFilterSwitcher';
import PuzzleDialoguesRenderer from './PuzzleDialoguesRenderer';

import { PuzzleDialoguesUserDeduplicatorProps } from './types';
import { Yami } from 'generated/globalTypes';

const PuzzleDialoguesUserDeduplicator = ({
  puzzleId,
  puzzleUser,
  puzzleStatus,
  userId,
  anonymous,
  shouldSubscribe,
}: PuzzleDialoguesUserDeduplicatorProps) => {
  const [userFilterId, setUserFilterId] = useState(userId);
  return (
    <React.Fragment>
      <Query<
        PuzzleUniqueParticipantsQuery,
        PuzzleUniqueParticipantsQueryVariables
      >
        query={PUZZLE_UNIQUE_PARTICIPANTS_QUERY}
        variables={{
          puzzleId,
        }}
        fetchPolicy="cache-first"
      >
        {({ error, data, loading }) => {
          if (error) {
            toast.error(error.message);
            return null;
          }
          if (!data || !data.puzzleParticipants) {
            if (loading) return <Loading centered />;
            return null;
          }
          return (
            <UserFilterSwitcher
              activeUserId={userFilterId}
              users={data.puzzleParticipants}
              onClick={setUserFilterId}
            />
          );
        }}
      </Query>
      {userFilterId && (
        <PuzzleDialoguesRenderer
          variables={{
            puzzleId,
            userId: userFilterId === -1 ? undefined : userFilterId,
          }}
          shouldSubscribe={shouldSubscribe}
          puzzleUser={puzzleUser}
          puzzleStatus={puzzleStatus}
          puzzleYami={
            // Only Solved yami will be using this component, so this
            // option will not be used in PuzzleDialoguesRenderer.
            Yami.NONE
          }
          anonymous={anonymous}
        />
      )}
    </React.Fragment>
  );
};

export default PuzzleDialoguesUserDeduplicator;
