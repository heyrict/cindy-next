import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mergeList, upsertMultipleItem } from 'common/update';
import { maybeSendNotification } from 'common/web-notify';
import { SUBSCRIPTION_BATCH_LIMIT } from 'settings';

import { useIntl } from 'react-intl';
import webNotifyMessages from 'messages/webNotify';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';
import * as globalReducer from 'reducers/global';
import * as awardCheckerReducer from 'reducers/awardChecker';
import * as settingReducer from 'reducers/setting';

import {
  HINT_LIVE_QUERY,
  HINT_WITH_USER_LIVE_QUERY,
} from 'graphql/LiveQueries/Hint';
import {
  DIALOGUE_LIVE_QUERY,
  DIALOGUE_WITH_USER_LIVE_QUERY,
} from 'graphql/LiveQueries/Dialogue';

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
  DialogueHintQuery_hint,
  DialogueHintQuery_dialogue,
  DialogueHintQuery,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { ActionContentType, StateType } from 'reducers/types';
import { HintLiveQuery } from 'graphql/LiveQueries/generated/HintLiveQuery';
import { DialogueLiveQuery } from 'graphql/LiveQueries/generated/DialogueLiveQuery';

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
  loading,
  error,
  data,
  variables,
  subscribeToMore,
  shouldSubscribe,
  user,
  incGoodQuestions,
  incTrueAnswers,
  applyUserFilter,
  puzzleUser,
  puzzleStatus,
  anonymous,
  pushNotification,
  setParticipants,
  setTrueSolvedLongtermYami,
  updateSolvedLongTermYamiOnSubscribe,
}: PuzzleDialoguesRendererProps) => {
  if (!data || !data.dialogue || !data.hint) {
    if (loading) return <Loading centered />;
    return null;
  }
  if (error) {
    toast.error(error.message);
    return null;
  }
  let users;

  if (applyUserFilter) {
    users = extractUserFilterUserFromDialogues(data.dialogue);
    setParticipants(users);
  }

  const intl = useIntl();
  const _ = intl.formatMessage;

  const [userFilterId, setUserFilterId] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    if (shouldSubscribe) {
      if (!variables || !variables.puzzleId) return;

      // {{{ handleDialogueSubscribeUpdate()
      const handleDialogueSubscribeUpdate = (
        prev: DialogueHintQuery,
        { subscriptionData }: { subscriptionData: { data: DialogueLiveQuery } },
      ) => {
        if (!subscriptionData.data) return prev;
        const { dialogue } = subscriptionData.data;
        if (dialogue === null || dialogue.length === 0) {
          return prev;
        }
        // display answer if user get true answer in long-term yami
        if (updateSolvedLongTermYamiOnSubscribe && dialogue[0].true)
          setTrueSolvedLongtermYami();

        // Update award checker
        const toUpdate = prev.dialogue.find(d => d.id === dialogue[0].id);
        if (toUpdate && toUpdate.user.id === user.id) {
          if (!toUpdate.good && dialogue[0].good) {
            incGoodQuestions();
          }
          if (toUpdate.good && !dialogue[0].good) {
            incGoodQuestions(-1);
          }
          if (!toUpdate.true && dialogue[0].true) {
            incTrueAnswers();
          }
          if (toUpdate.true && !dialogue[0].true) {
            incTrueAnswers(-1);
          }
        }

        // Notification for creator
        if (pushNotification && document.hidden && puzzleUser.id === user.id) {
          maybeSendNotification(_(webNotifyMessages.newDialogueAdded), {
            body: dialogue[0].question,
            renotify: true,
          });
        }

        return Object.assign({}, prev, {
          dialogue: upsertMultipleItem(prev.dialogue, dialogue, 'id', 'asc'),
        });
      };
      // }}}

      // {{{ handleHintSubscribeUpdate()
      const handleHintSubscribeUpdate = (
        prev: DialogueHintQuery,
        { subscriptionData }: { subscriptionData: { data: HintLiveQuery } },
      ) => {
        if (!subscriptionData.data) return prev;
        const { hint } = subscriptionData.data;
        if (hint === null || hint.length === 0) {
          return prev;
        }
        // Notification for participants
        if (document.hidden && puzzleUser.id !== user.id) {
          maybeSendNotification(_(webNotifyMessages.newHintAdded), {
            body: hint[0].content,
            renotify: true,
          });
        }

        return Object.assign({}, prev, {
          hint: upsertMultipleItem(prev.hint, hint, 'id', 'asc'),
        });
      };
      // }}}

      if (variables.userId) {
        // Subscribe with user id filtering
        const unsubscribeHint = subscribeToMore({
          document: HINT_WITH_USER_LIVE_QUERY,
          variables: { ...variables, limit: SUBSCRIPTION_BATCH_LIMIT },
          updateQuery: handleHintSubscribeUpdate,
        });
        const unsubscribeDialogue = subscribeToMore({
          document: DIALOGUE_WITH_USER_LIVE_QUERY,
          variables: { ...variables, limit: SUBSCRIPTION_BATCH_LIMIT },
          updateQuery: handleDialogueSubscribeUpdate,
        });
        return () => {
          unsubscribeHint();
          unsubscribeDialogue();
        };
      } else {
        // Subscribe without filtering
        const unsubscribeHint = subscribeToMore({
          document: HINT_LIVE_QUERY,
          variables: { ...variables, limit: SUBSCRIPTION_BATCH_LIMIT },
          updateQuery: handleHintSubscribeUpdate,
        });
        const unsubscribeDialogue = subscribeToMore({
          document: DIALOGUE_LIVE_QUERY,
          variables: { ...variables, limit: SUBSCRIPTION_BATCH_LIMIT },
          updateQuery: handleDialogueSubscribeUpdate,
        });
        return () => {
          unsubscribeHint();
          unsubscribeDialogue();
        };
      }
    }
  }, [variables && variables.puzzleId, user.id, shouldSubscribe]);

  let puzzleLogs;
  if (applyUserFilter && userFilterId !== -1) {
    puzzleLogs = data.puzzleLogs.filter(
      puzzleLog => puzzleLog.user.id === userFilterId,
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

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(PuzzleDialoguesRenderer);
