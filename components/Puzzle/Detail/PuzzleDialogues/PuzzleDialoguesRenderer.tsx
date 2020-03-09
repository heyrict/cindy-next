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
  DialogueHintQuery_sui_hei_hint,
  DialogueHintQuery_sui_hei_dialogue,
  DialogueHintQuery,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { ActionContentType, StateType } from 'reducers/types';
import { HintLiveQuery } from 'graphql/LiveQueries/generated/HintLiveQuery';
import { DialogueLiveQuery } from 'graphql/LiveQueries/generated/DialogueLiveQuery';

export const PuzzleDialoguesRendererInner = ({
  dialogues,
  hints,
  puzzleUser,
  puzzleStatus,
  anonymous,
}: PuzzleDialoguesRendererInnerProps) => {
  const dialogueHints: Array<
    DialogueHintQuery_sui_hei_dialogue | DialogueHintQuery_sui_hei_hint
  > = mergeList<
    DialogueHintQuery_sui_hei_dialogue | DialogueHintQuery_sui_hei_hint
  >(dialogues, hints, 'created', 'asc');

  return (
    <React.Fragment>
      {dialogueHints.map(node =>
        node.__typename === 'sui_hei_dialogue' ? (
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
  const { puzzleId } = variables;
  if (!data || !data.sui_hei_dialogue || !data.sui_hei_hint) {
    if (loading) return <Loading centered />;
    return null;
  }
  if (error) {
    toast.error(error.message);
    return null;
  }
  let users;

  if (applyUserFilter) {
    users = extractUserFilterUserFromDialogues(data.sui_hei_dialogue);
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
        const { sui_hei_dialogue } = subscriptionData.data;
        if (sui_hei_dialogue === null || sui_hei_dialogue.length === 0) {
          return prev;
        }
        // display answer if user get true answer in long-term yami
        if (updateSolvedLongTermYamiOnSubscribe && sui_hei_dialogue[0].true)
          setTrueSolvedLongtermYami();

        // Update award checker
        const toUpdate = prev.sui_hei_dialogue.find(
          d => d.id === sui_hei_dialogue[0].id,
        );
        if (toUpdate && toUpdate.sui_hei_user.id === user.id) {
          if (!toUpdate.good && sui_hei_dialogue[0].good) {
            incGoodQuestions();
          }
          if (toUpdate.good && !sui_hei_dialogue[0].good) {
            incGoodQuestions(-1);
          }
          if (!toUpdate.true && sui_hei_dialogue[0].true) {
            incTrueAnswers();
          }
          if (toUpdate.true && !sui_hei_dialogue[0].true) {
            incTrueAnswers(-1);
          }
        }

        // Notification for creator
        if (pushNotification && document.hidden && puzzleUser.id === user.id) {
          maybeSendNotification(_(webNotifyMessages.newDialogueAdded), {
            body: sui_hei_dialogue[0].question,
            renotify: true,
          });
        }

        return Object.assign({}, prev, {
          sui_hei_dialogue: upsertMultipleItem(
            prev.sui_hei_dialogue,
            sui_hei_dialogue,
            'id',
            'asc',
          ),
        });
      };
      // }}}

      // {{{ handleHintSubscribeUpdate()
      const handleHintSubscribeUpdate = (
        prev: DialogueHintQuery,
        { subscriptionData }: { subscriptionData: { data: HintLiveQuery } },
      ) => {
        if (!subscriptionData.data) return prev;
        const { sui_hei_hint } = subscriptionData.data;
        if (sui_hei_hint === null || sui_hei_hint.length === 0) {
          return prev;
        }
        // Notification for participants
        if (document.hidden && puzzleUser.id !== user.id) {
          maybeSendNotification(_(webNotifyMessages.newHintAdded), {
            body: sui_hei_hint[0].content,
            renotify: true,
          });
        }

        return Object.assign({}, prev, {
          sui_hei_hint: upsertMultipleItem(
            prev.sui_hei_hint,
            sui_hei_hint,
            'id',
            'asc',
          ),
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
  }, [puzzleId, user.id, shouldSubscribe]);

  let dialogues;
  let hints;
  if (applyUserFilter && userFilterId !== -1) {
    dialogues = data.sui_hei_dialogue.filter(
      dialogue => dialogue.sui_hei_user.id === userFilterId,
    );
    hints = data.sui_hei_hint.filter(
      hint => hint.receiver === null || hint.receiver.id === userFilterId,
    );
  } else {
    dialogues = data.sui_hei_dialogue;
    hints = data.sui_hei_hint;
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
        dialogues={dialogues}
        hints={hints}
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
