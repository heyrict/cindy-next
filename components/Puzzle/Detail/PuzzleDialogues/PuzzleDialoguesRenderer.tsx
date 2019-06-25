import React, { useEffect, useState } from 'react';
import { mergeList, upsertItem } from 'common/update';

import { DIALOGUE_HINT_SUBSCRIPTION } from 'graphql/Subscriptions/Dialogue';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

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
import { ActionContentType } from 'reducers/types';

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

export const PuzzleDialoguesRenderer = ({
  loading,
  error,
  data,
  variables,
  subscribeToMore,
  shouldSubscribe,
  applyUserFilter,
  puzzleUser,
  puzzleStatus,
  anonymous,
  setParticipants,
}: PuzzleDialoguesRendererProps) => {
  const { puzzleId } = variables;
  if (loading && (!data || !data.sui_hei_dialogue || !data.sui_hei_hint))
    return <span>Loading...</span>;
  if (error) return <span>`Error: ${JSON.stringify(error)}`</span>;
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

const mapDispatchToProps = (dispatch: (arg0: ActionContentType) => void) => ({
  setParticipants: (participants: Array<UserFilterSwitcherUserType>) =>
    dispatch(puzzleReducer.actions.setParticipants(participants)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(PuzzleDialoguesRenderer);
