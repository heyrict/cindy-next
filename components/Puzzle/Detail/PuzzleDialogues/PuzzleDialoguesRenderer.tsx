import React, { useEffect } from 'react';
import { mergeList, upsertItem } from 'common';

import { DIALOGUE_HINT_SUBSCRIPTION } from 'graphql/Subscriptions/Dialogue';

import { Flex } from 'components/General';
import PuzzleDialogue from './PuzzleDialogue';
import PuzzleHint from './PuzzleHint';

import { widthSplits } from '../constants';
import { PuzzleDialoguesRendererProps } from './types';
import { DialogueHintSubscription } from 'graphql/Subscriptions/generated/DialogueHintSubscription';

const PuzzleDialoguesRenderer = ({
  loading,
  error,
  data,
  subscribeToMore,
  shouldSubscribe,
  puzzleId,
  puzzleUser,
  puzzleStatus,
}: PuzzleDialoguesRendererProps) => {
  if (loading) return <span>'Loading...'</span>;
  if (error) return <span>`Error: ${JSON.stringify(error)}`</span>;
  if (!data || !data.sui_hei_dialogue || !data.sui_hei_hint) {
    return <span>'EMPTY'</span>;
  }

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

  const dialogueHints = mergeList(
    data.sui_hei_dialogue,
    data.sui_hei_hint,
    'created',
    'asc',
  );

  return (
    <Flex mx={widthSplits[0]} width={1} flexWrap="wrap">
      {dialogueHints.map((node, index) =>
        node.sui_hei_user ? (
          <PuzzleDialogue
            index={index + 1}
            key={`dialogue-${node.id}`}
            dialogue={node}
            puzzleUser={puzzleUser}
            puzzleStatus={puzzleStatus}
          />
        ) : (
          <PuzzleHint key={`hint-${node.id}`} hint={node} />
        ),
      )}
    </Flex>
  );
};

export default PuzzleDialoguesRenderer;
