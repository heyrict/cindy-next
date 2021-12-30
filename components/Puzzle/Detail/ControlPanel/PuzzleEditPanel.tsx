import React, { useEffect, useRef } from 'react';
import { getMaxDazedDays } from 'settings';
import { toast } from 'react-toastify';
import { upsertItem } from 'common/update';

import { useMutation } from '@apollo/client';
import { PUZZLES_SOLVED_QUERY } from 'graphql/Queries/Puzzles';
import {
  UPDATE_PUZZLE_MUTATION,
  UPDATE_PUZZLE_DAZED_ON_MUTATION,
} from 'graphql/Mutations/Puzzle';
import { PUZZLE_SHARED_FRAGMENT } from 'graphql/Fragments/Puzzles';

import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import { Flex, Box, ButtonTransparent, Switch } from 'components/General';

import { PuzzleEditPanelProps } from './types';
import {
  UpdatePuzzleDazedOnMutationVariables,
  UpdatePuzzleDazedOnMutation,
} from 'graphql/Mutations/generated/UpdatePuzzleDazedOnMutation';
import { Status, Yami } from 'generated/globalTypes';
import {
  PuzzlesSolvedQuery,
  PuzzlesSolvedQueryVariables,
} from 'graphql/Queries/generated/PuzzlesSolvedQuery';
import { PuzzleShared } from 'graphql/Fragments/generated/PuzzleShared';
import {
  UpdatePuzzleMutation,
  UpdatePuzzleMutationVariables,
} from 'graphql/Mutations/generated/UpdatePuzzleMutation';

const PuzzleEditPanel = ({
  puzzleId,
  yami,
  genre,
  grotesque,
  status,
  dazedOn,
  show,
}: PuzzleEditPanelProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);

  const [updatePuzzle] = useMutation<
    UpdatePuzzleMutation,
    UpdatePuzzleMutationVariables
  >(UPDATE_PUZZLE_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.updatePuzzle) return;

      // When puzzle is solved
      if (
        data.updatePuzzle.status !== Status.UNDERGOING &&
        status === Status.UNDERGOING
      ) {
        // Update Puzzle List Cache
        let prevQuery = proxy.readQuery<
          PuzzlesSolvedQuery,
          PuzzlesSolvedQueryVariables
        >({
          query: PUZZLES_SOLVED_QUERY,
        });

        let prevPuzzle = proxy.readFragment<PuzzleShared>({
          fragment: PUZZLE_SHARED_FRAGMENT,
          fragmentName: 'PuzzleShared',
          id: `Puzzle:${data.updatePuzzle.id}`,
        });

        if (prevQuery && prevPuzzle) {
          proxy.writeQuery<PuzzlesSolvedQuery, PuzzlesSolvedQueryVariables>({
            query: PUZZLES_SOLVED_QUERY,
            data: {
              puzzles: upsertItem(
                prevQuery.puzzles,
                {
                  ...prevPuzzle,
                  ...data.updatePuzzle,
                  starCount: 0,
                  starSum: 0,
                  commentCount: 0,
                  bookmarkCount: 0,
                  dialogueCount: 0,
                  dialogueNewCount: 0,
                },
                'modified',
                'desc',
              ),
            },
          });
        }
      }
    },
  });
  const [updatePuzzleDazedOn] = useMutation<
    UpdatePuzzleDazedOnMutation,
    UpdatePuzzleDazedOnMutationVariables
  >(UPDATE_PUZZLE_DAZED_ON_MUTATION);

  // Update dazedOn date
  useEffect(() => {
    if (status !== Status.UNDERGOING) return;
    const newDazedOn = new Date();
    const dazedTimeOffset = getMaxDazedDays({
      yami,
      genre,
    });
    newDazedOn.setDate(newDazedOn.getDate() + dazedTimeOffset);
    if (
      `${newDazedOn.getUTCFullYear()}-${newDazedOn.getUTCMonth()}${newDazedOn.getUTCDate()}` ===
      dazedOn
    )
      return;
    updatePuzzleDazedOn({
      variables: {
        puzzleId,
        dazedOn: newDazedOn.toISOString().split('T')[0],
      },
      optimisticResponse: {
        updatePuzzle: {
          __typename: 'Puzzle',
          id: puzzleId,
          dazedOn: newDazedOn.toISOString().split('T')[0],
        },
      },
    });
  }, [puzzleId]);

  if (!show) return null;

  const shouldShowPutSolution = status === Status.UNDERGOING;
  const shouldShowSetHidden =
    status !== Status.FORCE_HIDDEN && status !== Status.DAZED;
  const shouldShowToggleGrotesque = status !== Status.FORCE_HIDDEN;
  const shouldShowToggleYami =
    status === Status.UNDERGOING &&
    (yami === Yami.NONE || yami === Yami.NORMAL);

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
            value={dazedOn}
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
                    {yami === Yami.LONGTERM ? (
                      <FormattedMessage
                        {...messages.putSolutionLongtermYamiConfirm}
                      />
                    ) : (
                      <FormattedMessage {...messages.putSolutionConfirm} />
                    )}
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
                              status: Status.SOLVED,
                              grotesque,
                              yami,
                            },
                            optimisticResponse: {
                              updatePuzzle: {
                                __typename: 'Puzzle',
                                id: puzzleId,
                                grotesque,
                                status: Status.SOLVED,
                                yami,
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
                    yami: yami === Yami.NONE ? Yami.NORMAL : Yami.NONE,
                  },
                  optimisticResponse: {
                    updatePuzzle: {
                      __typename: 'Puzzle',
                      id: puzzleId,
                      grotesque,
                      status,
                      yami: yami === Yami.NONE ? Yami.NORMAL : Yami.NONE,
                    },
                  },
                });
              }}
            >
              {yami === Yami.NONE ? (
                <FormattedMessage {...messages.setYami} />
              ) : (
                <FormattedMessage {...messages.unsetYami} />
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
                      {...(status === Status.HIDDEN
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
                              status:
                                status === Status.HIDDEN
                                  ? Status.SOLVED
                                  : Status.HIDDEN,
                              grotesque,
                              yami,
                            },
                            optimisticResponse: {
                              updatePuzzle: {
                                __typename: 'Puzzle',
                                id: puzzleId,
                                grotesque,
                                status:
                                  status === Status.HIDDEN
                                    ? Status.SOLVED
                                    : Status.HIDDEN,
                                yami,
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
              {status === Status.HIDDEN ? (
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
                    updatePuzzle: {
                      __typename: 'Puzzle',
                      id: puzzleId,
                      grotesque: !grotesque,
                      status,
                      yami,
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
