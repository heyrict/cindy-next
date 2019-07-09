import React, { useEffect } from 'react';

import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, Box, ButtonTransparent, Switch } from 'components/General';

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
  // Update dazed_on date
  useEffect(() => {
    if (status !== 0) return;
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
        dazedOn: newDazedOn.toISOString(),
        grotesque,
        status,
        yami,
      },
      optimisticResponse: {
        update_sui_hei_puzzle: {
          __typename: 'sui_hei_puzzle_mutation_response',
          returning: [
            {
              __typename: 'sui_hei_puzzle',
              id: puzzleId,
              dazed_on: newDazedOn.toISOString(),
              grotesque,
              status,
              yami,
            },
          ],
        },
      },
    });
  }, [puzzleId]);

  if (!show) return null;

  const shouldShowPutSolution = status === 0;
  const shouldShowSetHidden = status !== 4 && status !== 2;
  const shouldShowToggleGrotesque = status !== 4;
  const shouldShowToggleYami = status === 0 && (yami === 0 || yami === 1);

  return (
    <Flex
      borderColor="orange.8"
      borderWidth={2}
      borderStyle="solid"
      borderRadius={1}
      flexWrap="wrap"
      width={1}
    >
      <Flex flexWrap="wrap" mb={2} width={1} bg="orange.1">
        <Box width="12em" textAlign="center" py={1} px={3} bg="orange.2">
          <FormattedMessage {...puzzleMessages.dazedOn} />
        </Box>
        <Box mx="auto" py={1}>
          <FormattedDate
            value={dazed_on}
            year="numeric"
            month="short"
            day="numeric"
          />
        </Box>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="space-around" mb={1} width={1}>
        {shouldShowPutSolution && (
          <Box bg="blue.5" borderRadius={2} mb={1}>
            <ButtonTransparent
              minWidth="16em"
              px={3}
              py={1}
              color="blue.0"
              onClick={() => {
                updatePuzzle({
                  variables: {
                    puzzleId,
                    status: 1,
                    dazedOn: dazed_on,
                    grotesque,
                    yami,
                  },
                  optimisticResponse: {
                    update_sui_hei_puzzle: {
                      __typename: 'sui_hei_puzzle_mutation_response',
                      returning: [
                        {
                          __typename: 'sui_hei_puzzle',
                          id: puzzleId,
                          dazed_on: dazed_on,
                          grotesque,
                          status: 1,
                          yami,
                        },
                      ],
                    },
                  },
                });
              }}
            >
              <FormattedMessage {...messages.putSolution} />
            </ButtonTransparent>
          </Box>
        )}
        {shouldShowToggleYami && (
          <Box bg="blue.5" borderRadius={2} mb={1}>
            <ButtonTransparent
              minWidth="16em"
              px={3}
              py={1}
              color="blue.0"
              onClick={() => {
                updatePuzzle({
                  variables: {
                    puzzleId,
                    status,
                    dazedOn: dazed_on,
                    grotesque,
                    yami: 1 - yami,
                  },
                  optimisticResponse: {
                    update_sui_hei_puzzle: {
                      __typename: 'sui_hei_puzzle_mutation_response',
                      returning: [
                        {
                          __typename: 'sui_hei_puzzle',
                          id: puzzleId,
                          dazed_on: dazed_on,
                          grotesque,
                          status,
                          yami: 1 - yami,
                        },
                      ],
                    },
                  },
                });
              }}
            >
              {yami === 1 ? (
                <FormattedMessage {...messages.unsetYami} />
              ) : (
                <FormattedMessage {...messages.setYami} />
              )}
            </ButtonTransparent>
          </Box>
        )}
        {shouldShowSetHidden && (
          <Box bg="blue.5" borderRadius={2} mb={1}>
            <ButtonTransparent
              minWidth="16em"
              px={3}
              py={1}
              color="blue.0"
              onClick={() => {
                updatePuzzle({
                  variables: {
                    puzzleId,
                    status: status === 3 ? 1 : 3,
                    dazedOn: dazed_on,
                    grotesque,
                    yami,
                  },
                  optimisticResponse: {
                    update_sui_hei_puzzle: {
                      __typename: 'sui_hei_puzzle_mutation_response',
                      returning: [
                        {
                          __typename: 'sui_hei_puzzle',
                          id: puzzleId,
                          dazed_on: dazed_on,
                          grotesque,
                          status: status === 3 ? 1 : 3,
                          yami,
                        },
                      ],
                    },
                  },
                });
              }}
            >
              {status === 3 ? (
                <FormattedMessage {...messages.unsetHidden} />
              ) : (
                <FormattedMessage {...messages.setHidden} />
              )}
            </ButtonTransparent>
          </Box>
        )}
        {shouldShowToggleGrotesque && (
          <Flex minWidth="16em" alignItems="center" mb={1}>
            <Switch
              px={3}
              py={1}
              color="blue.0"
              value={grotesque}
              onClick={() => {
                updatePuzzle({
                  variables: {
                    puzzleId,
                    status,
                    dazedOn: dazed_on,
                    grotesque: !grotesque,
                    yami,
                  },
                  optimisticResponse: {
                    update_sui_hei_puzzle: {
                      __typename: 'sui_hei_puzzle_mutation_response',
                      returning: [
                        {
                          __typename: 'sui_hei_puzzle',
                          id: puzzleId,
                          dazed_on: dazed_on,
                          grotesque: !grotesque,
                          status,
                          yami,
                        },
                      ],
                    },
                  },
                });
              }}
            />
            {grotesque ? (
              <FormattedMessage {...messages.unsetGrotesque} />
            ) : (
              <FormattedMessage {...messages.setGrotesque} />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default PuzzleEditPanel;
