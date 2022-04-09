import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { upsertMultipleItem } from 'common/update';
import { maybeSendNotification } from 'common/web-notify';

import { useIntl } from 'react-intl';
import webNotifyMessages from 'messages/webNotify';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';
import * as globalReducer from 'reducers/global';
import * as awardCheckerReducer from 'reducers/awardChecker';
import * as settingReducer from 'reducers/setting';

import { useQuery, useApolloClient } from '@apollo/client';
import { DIALOGUE_HINT_QUERY } from 'graphql/Queries/Dialogues';
import {
  PUZZLE_LOG_WITH_USER_SUB,
  PUZZLE_LOG_SUB,
} from 'graphql/Subscriptions/PuzzleLog';

import { Flex } from 'components/General';
import Loading from 'components/General/Loading';
import PuzzleDialogue from './PuzzleDialogue';
import PuzzleHint from './PuzzleHint';
import UserFilterSwitcher from './UserFilterSwitcher';

import { extractUserFilterUserFromDialogues } from './constants';
import { widthSplits } from '../constants';

import {
  PuzzleDialoguesRendererInnerProps,
  PuzzleDialoguesRendererProps,
  PuzzleDialoguesRendererDefaultProps,
  UserFilterSwitcherUserType,
} from './types';
import {
  DialogueHintQuery,
  DialogueHintQueryVariables,
  DialogueHintQuery_puzzleLogs_Dialogue,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { ActionContentType, StateType } from 'reducers/types';
import {
  PuzzleLogSub,
  PuzzleLogSubVariables,
} from 'graphql/Subscriptions/generated/PuzzleLogSub';
import {
  PuzzleLogWithUserSub,
  PuzzleLogWithUserSubVariables,
} from 'graphql/Subscriptions/generated/PuzzleLogWithUserSub';
import { DbOp, Status, Yami } from 'generated/globalTypes';

type Dialogue = DialogueHintQuery_puzzleLogs_Dialogue;

let prevUpdateTime = new Date().getTime();

export const PuzzleDialoguesRendererInner = ({
  puzzleLogs,
  puzzleUser,
  puzzleStatus,
  anonymous,
}: PuzzleDialoguesRendererInnerProps) => {
  return (
    <React.Fragment>
      {puzzleLogs.map(node =>
        node.__typename === 'Dialogue' ? (
          <PuzzleDialogue
            index={node.qno}
            key={`dialogue-${node.id}`}
            dialogue={node}
            puzzleUser={puzzleUser}
            puzzleStatus={puzzleStatus}
            anonymous={anonymous}
          />
        ) : (
          <PuzzleHint
            key={`hint-${node.id}`}
            hint={node}
            puzzleUser={puzzleUser}
          />
        ),
      )}
    </React.Fragment>
  );
};

export const PuzzleDialoguesRenderer = ({
  variables,
  shouldSubscribe,
  user,
  incGoodQuestions,
  incTrueAnswers,
  applyUserFilter,
  puzzleUser,
  puzzleStatus,
  puzzleYami,
  anonymous,
  pushNotification,
  setParticipants,
  setTrueSolvedLongtermYami,
  updateSolvedLongTermYamiOnSubscribe,
}: PuzzleDialoguesRendererProps) => {
  const client = useApolloClient();
  const { loading, error, data, subscribeToMore, refetch } = useQuery<
    DialogueHintQuery,
    DialogueHintQueryVariables
  >(DIALOGUE_HINT_QUERY, {
    variables,
    onCompleted: ({ puzzleLogs }) => {
      if (!puzzleLogs) return;
      if (
        user.id !== puzzleUser.id &&
        puzzleStatus === Status.UNDERGOING &&
        puzzleYami === Yami.LONGTERM &&
        puzzleLogs.some(log => log.__typename === 'Dialogue' && log.true)
      )
        setTrueSolvedLongtermYami();
    },
  });

  const [userFilterId, setUserFilterId] = useState<number | undefined>(
    undefined,
  );

  const { formatMessage: _ } = useIntl();

  // Refetches whole query on initial loading
  useEffect(() => {
    refetch();
  }, [variables && variables.puzzleId, user.id]);

  useEffect(() => {
    if (shouldSubscribe) {
      if (!variables || !variables.puzzleId) return;

      // {{{ handlePuzzleLogSubUpdate()
      const handlePuzzleLogSubUpdate = (
        prev: DialogueHintQuery,
        { subscriptionData }: { subscriptionData: { data: PuzzleLogSub } },
      ) => {
        if (!prev.puzzleLogs) {
          prev = { puzzleLogs: [] };
        }
        if (!subscriptionData.data) return prev;
        const { puzzleLogSub } = subscriptionData.data;
        if (!puzzleLogSub) return prev;

        const newModified = new Date(puzzleLogSub.data.modified).getTime();

        if (prevUpdateTime >= newModified && puzzleLogSub.op != DbOp.UPDATED)
          return prev;

        client
          .query<DialogueHintQuery, DialogueHintQueryVariables>({
            query: DIALOGUE_HINT_QUERY,
            variables: {
              ...variables,
              since: new Date(prevUpdateTime).toISOString(),
            },
            fetchPolicy: 'network-only',
          })
          .then(({ data }) => {
            if (data.puzzleLogs.length > 0) {
              let tail = data.puzzleLogs[data.puzzleLogs.length - 1];
              if (tail.__typename === 'Dialogue') {
                // display answer if user get true answer in long-term yami
                if (updateSolvedLongTermYamiOnSubscribe && tail.true)
                  setTrueSolvedLongtermYami();

                // Update award checker
                const toUpdate = prev.puzzleLogs.find(
                  d => d.__typename === 'Dialogue' && d.id === tail.id,
                ) as Dialogue | undefined;
                if (toUpdate && toUpdate.user.id === user.id) {
                  if (!toUpdate.good && tail.good) {
                    incGoodQuestions();
                  }
                  if (toUpdate.good && !tail.good) {
                    incGoodQuestions(-1);
                  }
                  if (!toUpdate.true && tail.true) {
                    incTrueAnswers();
                  }
                  if (toUpdate.true && !tail.true) {
                    incTrueAnswers(-1);
                  }
                }

                // Notification for creator
                if (
                  pushNotification &&
                  document.hidden &&
                  puzzleUser.id === user.id
                ) {
                  maybeSendNotification(_(webNotifyMessages.newDialogueAdded), {
                    body: tail.question,
                    renotify: true,
                  });
                }
              } else {
                // Hint
                // Notification for participants
                if (document.hidden && puzzleUser.id !== user.id) {
                  maybeSendNotification(_(webNotifyMessages.newHintAdded), {
                    body: tail.content,
                    renotify: true,
                  });
                }
              }
            }

            // Updates the original query
            const puzzleLogs = upsertMultipleItem(
              prev.puzzleLogs,
              data.puzzleLogs,
              'created',
              'asc',
            );
            client.writeQuery<DialogueHintQuery, DialogueHintQueryVariables>({
              query: DIALOGUE_HINT_QUERY,
              variables,
              data: {
                puzzleLogs,
              },
            });

            // Update last updated time
            const maxModified = Math.max(
              ...puzzleLogs.map(({ modified }: { modified: string }) =>
                new Date(modified).getTime(),
              ),
            );
            prevUpdateTime =
              maxModified > 0 ? maxModified : new Date().getTime();
          });

        return prev;
      };
      // }}}

      const userId = variables.userId;
      if (userId !== null && userId !== undefined) {
        // Subscribe with user id filtering
        const unsubscribePuzzleLog = subscribeToMore<
          PuzzleLogWithUserSub,
          PuzzleLogWithUserSubVariables
        >({
          document: PUZZLE_LOG_WITH_USER_SUB,
          variables: {
            puzzleId: variables.puzzleId,
            userId,
          },
          updateQuery: handlePuzzleLogSubUpdate,
        });
        return () => {
          unsubscribePuzzleLog();
        };
      } else {
        // Subscribe without filtering
        const unsubscribePuzzleLog = subscribeToMore<
          PuzzleLogSub,
          PuzzleLogSubVariables
        >({
          document: PUZZLE_LOG_SUB,
          variables: {
            puzzleId: variables.puzzleId,
          },
          updateQuery: handlePuzzleLogSubUpdate,
        });
        return () => {
          unsubscribePuzzleLog();
        };
      }
    }
  }, [variables && variables.puzzleId, user.id, shouldSubscribe]);

  if (!data || !data.puzzleLogs) {
    if (loading) return <Loading centered />;
    return null;
  }
  if (error) {
    toast.error(error.message);
    return null;
  }
  let users;

  if (applyUserFilter) {
    users = extractUserFilterUserFromDialogues(data.puzzleLogs);
    setParticipants(users);
  }

  let puzzleLogs;
  if (applyUserFilter && userFilterId !== -1) {
    puzzleLogs = data.puzzleLogs.filter(puzzleLog =>
      puzzleLog.__typename === 'Dialogue'
        ? puzzleLog.user.id === userFilterId
        : puzzleLog.receiver
        ? puzzleLog.receiver.id === userFilterId
        : true,
    );
  } else {
    puzzleLogs = data.puzzleLogs;
  }

  return (
    <Flex mx={widthSplits[0]} width={1} flexWrap="wrap">
      {applyUserFilter && users && (
        <UserFilterSwitcher
          activeUserId={userFilterId}
          users={users}
          onClick={setUserFilterId}
        />
      )}
      <PuzzleDialoguesRendererInner
        puzzleLogs={puzzleLogs}
        puzzleUser={puzzleUser}
        puzzleStatus={puzzleStatus}
        anonymous={anonymous}
      />
    </Flex>
  );
};

PuzzleDialoguesRenderer.defaultProps = PuzzleDialoguesRendererDefaultProps;

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
  pushNotification: settingReducer.rootSelector(state).pushNotification,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setParticipants: (participants: Array<UserFilterSwitcherUserType>) =>
    dispatch(puzzleReducer.actions.participants.set(participants)),
  setTrueSolvedLongtermYami: () =>
    dispatch(puzzleReducer.actions.solvedLongtermYami.setTrue()),
  incGoodQuestions: (value?: number) =>
    dispatch(awardCheckerReducer.actions.goodQuestions.inc(value)),
  incTrueAnswers: (value?: number) =>
    dispatch(awardCheckerReducer.actions.trueAnswers.inc(value)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(PuzzleDialoguesRenderer);
