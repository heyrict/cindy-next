import React, { useEffect, useState } from 'react';
import { mergeList, upsertItem } from 'common';

import { DIALOGUE_HINT_SUBSCRIPTION } from 'graphql/Subscriptions/Dialogue';

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
  ExtractUserFilterUserReturnType,
  PuzzleDialogueWithIndexExtra,
} from './types';
import { DialogueHintSubscription } from 'graphql/Subscriptions/generated/DialogueHintSubscription';
import { DialogueHintQuery_sui_hei_hint } from 'graphql/Queries/generated/DialogueHintQuery';

const PuzzleDialoguesRendererInner = ({
  dialogues,
  hints,
  puzzleUser,
  puzzleStatus,
}: PuzzleDialoguesRendererInnerProps) => {
  const dialogueHints: Array<
    PuzzleDialogueWithIndexExtra | DialogueHintQuery_sui_hei_hint
  > = mergeList(dialogues, hints, 'created', 'asc');

  return (
    <React.Fragment>
      {dialogueHints.map(node =>
        node.__typename === 'sui_hei_dialogue' ? (
          <PuzzleDialogue
            index={node.index + 1}
            key={`dialogue-${node.id}`}
            dialogue={node}
            puzzleUser={puzzleUser}
            puzzleStatus={puzzleStatus}
          />
        ) : (
          <PuzzleHint key={`hint-${node.id}`} hint={node} />
        ),
      )}
    </React.Fragment>
  );
};

const PuzzleDialoguesRenderer = ({
  loading,
  error,
  data,
  subscribeToMore,
  shouldSubscribe,
  applyUserFilter,
  puzzleId,
  puzzleUser,
  puzzleStatus,
}: PuzzleDialoguesRendererProps) => {
  if (loading) return <span>'Loading...'</span>;
  if (error) return <span>`Error: ${JSON.stringify(error)}`</span>;
  if (!data || !data.sui_hei_dialogue || !data.sui_hei_hint) {
    return <span>'EMPTY'</span>;
  }
  let users;

  if (applyUserFilter)
    users = extractUserFilterUserFromDialogues(data.sui_hei_dialogue);

  const [userFilterId, setUserFilterId] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    if (shouldSubscribe) {
      return subscribeToMore({
        document: DIALOGUE_HINT_SUBSCRIPTION,
        variables: { puzzleId },
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

  let dialogues: Array<PuzzleDialogueWithIndexExtra>;
  if (applyUserFilter) {
    dialogues = data.sui_hei_dialogue
      .filter(dialogue => dialogue.sui_hei_user.id === userFilterId)
      .map((dialogue, index) => ({
        ...dialogue,
        index,
      }));
  } else {
    dialogues = data.sui_hei_dialogue.map((dialogue, index) => ({
      ...dialogue,
      index,
    }));
  }

  return (
    <Flex mx={widthSplits[0]} width={1} flexWrap="wrap">
      {applyUserFilter && (
        <UserFilterSwitcher
          activeUserId={userFilterId}
          users={users as Array<ExtractUserFilterUserReturnType>}
          onClick={setUserFilterId}
        />
      )}
      <PuzzleDialoguesRendererInner
        dialogues={dialogues}
        hints={data.sui_hei_hint}
        puzzleUser={puzzleUser}
        puzzleStatus={puzzleStatus}
      />
    </Flex>
  );
};

PuzzleDialoguesRenderer.defaultProps = PuzzleDialoguesRendererDefaultProps;

export default PuzzleDialoguesRenderer;
