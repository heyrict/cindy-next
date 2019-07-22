import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mergeList, upsertItem } from 'common/update';

import { DIALOGUE_HINT_SUBSCRIPTION } from 'graphql/Subscriptions/Dialogue';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';
import * as globalReducer from 'reducers/global';
import * as awardCheckerReducer from 'reducers/awardChecker';
import * as settingReducer from 'reducers/setting';

import { Flex } from 'components/General';
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
import { DialogueHintSubscription } from 'graphql/Subscriptions/generated/DialogueHintSubscription';
import {
  DialogueHintQuery_sui_hei_hint,
  DialogueHintQuery_sui_hei_dialogue,
} from 'graphql/Queries/generated/DialogueHintQuery';
import { ActionContentType, StateType } from 'reducers/types';
import webNotifyMessages from 'messages/webNotify';
import { maybeSendNotification } from 'common/web-notify';
import { IntlShape, intlShape } from 'react-intl';

export const PuzzleDialoguesRendererInner = ({
  dialogues,
  hints,
  puzzleUser,
  puzzleStatus,
  anonymous,
}: PuzzleDialoguesRendererInnerProps) => {
  const dialogueHints: Array<
    DialogueHintQuery_sui_hei_dialogue | DialogueHintQuery_sui_hei_hint
  > = mergeList(dialogues, hints, 'created', 'asc');

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

export const PuzzleDialoguesRenderer = (
  {
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
  }: PuzzleDialoguesRendererProps,
  context: { intl: IntlShape },
) => {
  const _: any = context.intl.formatMessage;
  const { puzzleId } = variables;
  if (loading && (!data || !data.sui_hei_dialogue || !data.sui_hei_hint))
    return <span>Loading...</span>;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.sui_hei_dialogue || !data.sui_hei_hint) {
    return <span>EMPTY</span>;
  }
  let users;

  if (applyUserFilter) {
    users = extractUserFilterUserFromDialogues(data.sui_hei_dialogue);
    setParticipants(users);
  }

  const [userFilterId, setUserFilterId] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    if (shouldSubscribe) {
      return subscribeToMore({
        document: DIALOGUE_HINT_SUBSCRIPTION,
        variables,
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: { subscriptionData: { data: DialogueHintSubscription } },
        ) => {
          if (!subscriptionData.data) return prev;
          const subData = subscriptionData.data.dialogueHintSub;
          if (subData === null) return prev;
          const { sui_hei_dialogue, sui_hei_hint } = subData;
          if (sui_hei_dialogue !== null) {
            // display answer if user get true answer in long-term yami
            if (updateSolvedLongTermYamiOnSubscribe && sui_hei_dialogue.true)
              setTrueSolvedLongtermYami();

            // Update award checker
            const toUpdate = prev.sui_hei_dialogue.find(
              d => d.id === sui_hei_dialogue.id,
            );
            if (toUpdate && toUpdate.sui_hei_user.id === user.id) {
              if (!toUpdate.good && sui_hei_dialogue.good) {
                incGoodQuestions();
              }
              if (toUpdate.good && !sui_hei_dialogue.good) {
                incGoodQuestions(-1);
              }
              if (!toUpdate.true && sui_hei_dialogue.true) {
                incTrueAnswers();
              }
              if (toUpdate.true && !sui_hei_dialogue.true) {
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
                body: sui_hei_dialogue.question,
                renotify: true,
              });
            }

            return Object.assign({}, prev, {
              sui_hei_dialogue: upsertItem(
                prev.sui_hei_dialogue,
                sui_hei_dialogue,
                'id',
                'asc',
              ),
            });
          }
          if (sui_hei_hint !== null) {
            // Notification for participants
            if (document.hidden && puzzleUser.id !== user.id) {
              maybeSendNotification(_(webNotifyMessages.newHintAdded), {
                body: sui_hei_hint.content,
                renotify: true,
              });
            }

            return Object.assign({}, prev, {
              sui_hei_hint: upsertItem(
                prev.sui_hei_hint,
                sui_hei_hint,
                'id',
                'asc',
              ),
            });
          }
          return prev;
        },
      });
    }
  }, [puzzleId]);

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

PuzzleDialoguesRenderer.contextTypes = {
  intl: intlShape,
};

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
