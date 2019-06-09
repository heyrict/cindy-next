import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PTUserInlineUser } from 'components/User/PropTypes';
import { mergeList, upsertItem } from 'common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Query } from 'react-apollo';
import { DialogueHintQuery } from 'graphql/Queries/Dialogues';
import { DialogueHintSubscription } from 'graphql/Subscriptions/Dialogue';

import { Flex } from 'components/General';
import PuzzleDialogue from './PuzzleDialogue';
import PuzzleHint from './PuzzleHint';

import { widthSplits } from '../constants';

const PuzzleDialoguesRenderer = ({
  loading,
  error,
  data,
  subscribeToMore,
  shouldSubscribe,
  puzzleId,
  puzzleUser,
  puzzleStatus,
  userId,
  anonymous,
}) => {
  if (loading) return 'Loading...';
  if (error) return `Error: ${JSON.stringify(error)}`;
  if (!data || !data.sui_hei_dialogue || !data.sui_hei_hint) {
    return 'EMPTY';
  }

  useEffect(() => {
    if (shouldSubscribe) {
      return subscribeToMore({
        document: DialogueHintSubscription,
        variables: { puzzleId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const {
            sui_hei_dialogue,
            sui_hei_hint,
            eventType,
          } = subscriptionData.data.dialogueHintSub;
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
      {dialogueHints.map(node =>
        node.sui_hei_user ? (
          <PuzzleDialogue
            key={`dialogue-${node.id}`}
            dialogue={node}
            puzzleId={puzzleId}
            puzzleUser={puzzleUser}
            puzzleStatus={puzzleStatus}
            userId={userId}
            anonymous={anonymous}
          />
        ) : (
          <PuzzleHint
            key={`hint-${node.id}`}
            hint={node}
            puzzleUser={puzzleUser}
            puzzleStatus={puzzleStatus}
            userId={userId}
          />
        ),
      )}
    </Flex>
  );
};

const PuzzleDialogues = ({
  puzzleId,
  puzzleUser,
  userId,
  anonymous,
  puzzleStatus,
}) => {
  // Should remain in subscription if puzzle finished just now
  const [shouldSubscribe, setShouldSubscribe] = useState(false);
  useEffect(() => {
    if (puzzleStatus === 0) {
      setShouldSubscribe(true);
    }
    return () => setShouldSubscribe(false);
  }, []);

  return (
    <React.Fragment>
      <Query
        query={DialogueHintQuery}
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
            userId={userId}
            anonymous={anonymous}
            puzzleStatus={puzzleStatus}
          />
        )}
      </Query>
    </React.Fragment>
  );
};

PuzzleDialogues.propTypes = {
  puzzleId: PropTypes.number.isRequired,
  puzzleUser: PTUserInlineUser.isRequired,
  puzzleStatus: PropTypes.number.isRequired,
  userId: PropTypes.number,
  anonymous: PropTypes.bool.isRequired,
};

export default PuzzleDialogues;
