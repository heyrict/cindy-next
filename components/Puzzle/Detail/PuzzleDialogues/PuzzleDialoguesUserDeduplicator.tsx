import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Query } from '@apollo/react-components';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';
import {
  PuzzleUniqueParticipantsQuery,
  PuzzleUniqueParticipantsQueryVariables,
} from 'graphql/Queries/generated/PuzzleUniqueParticipantsQuery';
import { PUZZLE_UNIQUE_PARTICIPANTS_QUERY } from 'graphql/Queries/Puzzles';

import Loading from 'components/General/Loading';
import UserFilterSwitcher from './UserFilterSwitcher';
import PuzzleDialoguesRenderer from './PuzzleDialoguesRenderer';

import { PuzzleDialoguesUserDeduplicatorProps } from './types';

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
          if (!data || !data.user) {
            if (loading) return <Loading centered />;
            return null;
          }
          const filterUsers = data.user.map(user => ({
            id: user.id,
            nickname: user.nickname,
            dialogueCount:
              (user.dialogues_aggregate.aggregate &&
                user.dialogues_aggregate.aggregate.count) ||
              undefined,
          }));
          return (
            <Query<
              PuzzleUniqueParticipantsQuery,
              PuzzleUniqueParticipantsQueryVariables
            >
              query={PUZZLE_UNIQUE_PARTICIPANTS_QUERY}
              variables={{
                puzzleId,
                dialogueTrue: true,
              }}
              fetchPolicy="cache-first"
            >
              {({ error, data }) => {
                if (error) {
                  toast.error(error.message);
                  return null;
                }
                let filterUsersWithTrue = filterUsers;
                if (data && data.user) {
                  filterUsersWithTrue = filterUsers.map(user => {
                    const withTrueUser = data.user.find(u => u.id === user.id);
                    if (!withTrueUser) return user;
                    return {
                      ...user,
                      dialogueHasTrue: Boolean(
                        withTrueUser.dialogues_aggregate.aggregate &&
                          withTrueUser.dialogues_aggregate.aggregate.count,
                      ),
                    };
                  });
                }
                return (
                  <UserFilterSwitcher
                    activeUserId={userFilterId}
                    users={filterUsersWithTrue}
                    onClick={setUserFilterId}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
      {userFilterId && (
        <Query<DialogueHintQuery, DialogueHintQueryVariables>
          query={DIALOGUE_HINT_QUERY}
          variables={{
            puzzleId,
            userId: userFilterId === -1 ? undefined : userFilterId,
          }}
          fetchPolicy="cache-and-network"
        >
          {queryResult => (
            <PuzzleDialoguesRenderer
              {...queryResult}
              shouldSubscribe={shouldSubscribe}
              puzzleUser={puzzleUser}
              anonymous={anonymous}
              puzzleStatus={puzzleStatus}
            />
          )}
        </Query>
      )}
    </React.Fragment>
  );
};

export default PuzzleDialoguesUserDeduplicator;
