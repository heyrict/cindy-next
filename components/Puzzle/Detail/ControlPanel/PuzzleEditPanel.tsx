import React, { useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';

import { Button, Flex } from 'components/General';

import { PuzzleEditPanelProps } from './types';
import { getMaxDazedDays } from 'settings';

const PuzzleEditPanel = ({
  puzzleId,
  yami,
  genre,
  grotesque,
  status,
  dazed_on,
  updatePuzzle,
  show,
}: PuzzleEditPanelProps) => {
  useEffect(() => {
    const newDazedOn = new Date();
    const dazedTimeOffset = getMaxDazedDays({
      yami,
      genre,
    });
    newDazedOn.setDate(newDazedOn.getDate() + dazedTimeOffset);
    if (
      `${newDazedOn.getUTCFullYear()}-${newDazedOn.getUTCMonth()}${newDazedOn.getUTCDate()}` ===
      dazed_on
    )
      return;
    updatePuzzle({
      variables: {
        puzzleId,
        dazedOn: newDazedOn,
        grotesque,
        status,
      },
    });
  }, [puzzleId]);

  if (!show) return null;

  return (
    <Flex
      borderColor="orange.8"
      borderWidth={2}
      borderStyle="solid"
      borderRadius={1}
      flexWrap="wrap"
      width={1}
    >
      <Button
        py={1}
        width={1 / 2}
        onClick={() => {
          updatePuzzle({
            variables: {
              puzzleId,
              status: 1,
              dazedOn: dazed_on,
              grotesque,
            },
          });
        }}
      >
        <FormattedMessage {...messages.putSolution} />
      </Button>
      <Button
        py={1}
        width={1 / 2}
        onClick={() => {
          updatePuzzle({
            variables: {
              puzzleId,
              status: 3,
              dazedOn: dazed_on,
              grotesque,
            },
          });
        }}
      >
        <FormattedMessage {...messages.setHidden} />
      </Button>
    </Flex>
  );
};

export default PuzzleEditPanel;
