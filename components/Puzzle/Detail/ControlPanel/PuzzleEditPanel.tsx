import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

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
  updatePuzzleDazedOn,
  show,
}: PuzzleEditPanelProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);

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
    updatePuzzleDazedOn({
      variables: {
        puzzleId,
        dazedOn: newDazedOn.toISOString(),
      },
      optimisticResponse: {
        update_sui_hei_puzzle: {
          __typename: 'sui_hei_puzzle_mutation_response',
          returning: [
            {
              __typename: 'sui_hei_puzzle',
              id: puzzleId,
              dazed_on: newDazedOn.toISOString(),
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
                if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                notifHdlRef.current = toast.warn(
                  <Box>
                    <FormattedMessage {...messages.putSolutionConfirm} />
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      bg="cyan.6"
                      borderRadius={2}
                    >
                      <ButtonTransparent
                        width={1}
                        color="cyan.0"
                        onClick={() => {
                          if (notifHdlRef.current)
                            toast.dismiss(notifHdlRef.current);
                          updatePuzzle({
                            variables: {
                              puzzleId,
                              status: 1,
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
                        <FormattedMessage {...commonMessages.continue} />
                      </ButtonTransparent>
                    </Flex>
                  </Box>,
                  { autoClose: false },
                );
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
                if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                notifHdlRef.current = toast.warn(
                  <Box>
                    <FormattedMessage
                      {...(status === 3
                        ? messages.unsetHiddenConfirm
                        : messages.setHiddenConfirm)}
                    />
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      bg="cyan.6"
                      borderRadius={2}
                    >
                      <ButtonTransparent
                        width={1}
                        color="cyan.0"
                        onClick={() => {
                          if (notifHdlRef.current)
                            toast.dismiss(notifHdlRef.current);
                          updatePuzzle({
                            variables: {
                              puzzleId,
                              status: status === 3 ? 1 : 3,
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
                        <FormattedMessage {...commonMessages.continue} />
                      </ButtonTransparent>
                    </Flex>
                  </Box>,
                  { autoClose: false },
                );
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
              selected={grotesque}
              onClick={() => {
                updatePuzzle({
                  variables: {
                    puzzleId,
                    status,
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
