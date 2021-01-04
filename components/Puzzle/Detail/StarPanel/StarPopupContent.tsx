import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import StarInput from 'components/Star/StarInput';

import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_STAR_MUTATION,
  UPDATE_STAR_MUTATION,
} from 'graphql/Mutations/Star';
import {
  PUZZLE_STAR_QUERY,
  PREVIOUS_STAR_VALUE_QUERY,
} from 'graphql/Queries/Star';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import { MAX_DISPLAY_STAR_USERS } from './constants';

import { AddStarContentProps, StarPopupContentProps } from './types';
import {
  PuzzleStarQuery,
  PuzzleStarQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarQuery';
import {
  AddStarMutation,
  AddStarMutationVariables,
} from 'graphql/Mutations/generated/AddStarMutation';
import {
  PreviousStarValueQuery,
  PreviousStarValueQueryVariables,
} from 'graphql/Queries/generated/PreviousStarValueQuery';
import { StateType } from 'reducers/types';
import {
  UpdateStarMutation,
  UpdateStarMutationVariables,
} from 'graphql/Mutations/generated/UpdateStarMutation';

const AddStarContent = ({ userId, puzzleId }: AddStarContentProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);

  const { data, error, loading } = useQuery<
    PreviousStarValueQuery,
    PreviousStarValueQueryVariables
  >(PREVIOUS_STAR_VALUE_QUERY, {
    variables: {
      puzzleId,
      userId,
    },
  });
  const [addStar] = useMutation<AddStarMutation, AddStarMutationVariables>(
    ADD_STAR_MUTATION,
    {
      update: (proxy, { data }) => {
        if (!data || !data.createStar) return;
        const newStar = data.createStar;
        proxy.writeQuery<
          PreviousStarValueQuery,
          PreviousStarValueQueryVariables
        >({
          query: PREVIOUS_STAR_VALUE_QUERY,
          variables: {
            puzzleId,
            userId,
          },
          data: {
            stars: [newStar],
          },
        });
      },
      onCompleted: () => {
        if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
        toast.info(<FormattedMessage {...commonMessages.saved} />);
      },
      onError: error => {
        toast.error(`${error.name}: ${error.message}`);
      },
    },
  );
  const [updateStar] = useMutation<
    UpdateStarMutation,
    UpdateStarMutationVariables
  >(UPDATE_STAR_MUTATION, {
    onCompleted: () => {
      if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
      toast.info(<FormattedMessage {...commonMessages.saved} />);
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
    },
  });

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.stars) {
    if (loading) return <Loading centered />;
    return null;
  }
  const initialValue = data.stars.length === 0 ? 0 : data.stars[0].value;
  return (
    <>
      {initialValue === 0 ? (
        <Box pr={1}>
          <FormattedMessage {...puzzleMessages.addStars} />:
        </Box>
      ) : (
        <Box pr={1}>
          <FormattedMessage {...puzzleMessages.yourStars} />:
        </Box>
      )}
      <StarInput
        initialValue={initialValue}
        onChange={value => {
          if (data.stars.length === 0) {
            // If the user does not have a star on this puzzle
            // before, create one.
            addStar({
              variables: {
                puzzleId,
                value,
              },
              optimisticResponse: {
                createStar: {
                  __typename: 'Star',
                  id: -1,
                  value,
                },
              },
            });
          } else {
            // Otherwise, update that star
            const star = data.stars[0];
            updateStar({
              variables: {
                id: star.id,
                value,
              },
              optimisticResponse: {
                updateStar: {
                  __typename: 'Star',
                  id: star.id,
                  value,
                },
              },
            });
          }

          notifHdlRef.current = toast.info(
            <FormattedMessage {...commonMessages.saving} />,
          );
        }}
      />
    </>
  );
};

const StarPopupContent = ({
  userId,
  puzzleId,
  starCount,
  setShow,
  buttonRef,
  canAddStar,
}: StarPopupContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null!);

  const { data, error, loading } = useQuery<
    PuzzleStarQuery,
    PuzzleStarQueryVariables
  >(PUZZLE_STAR_QUERY, {
    variables: { puzzleId, limit: MAX_DISPLAY_STAR_USERS },
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node | null) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node | null)
      ) {
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.stars) {
    if (loading) return <Loading centered />;
    return null;
  }

  return (
    <>
      <Flex ref={contentRef} width={1} flexWrap="wrap">
        <Box width={1} mb={2}>
          {MAX_DISPLAY_STAR_USERS < starCount ? (
            <FormattedMessage
              {...puzzleMessages.starUsersWithExtra}
              values={{
                users: data.stars
                  .slice(0, MAX_DISPLAY_STAR_USERS)
                  .map(star => star.user.nickname)
                  .join(', '),
                count: starCount - MAX_DISPLAY_STAR_USERS,
              }}
            />
          ) : (
            <FormattedMessage
              {...puzzleMessages.starUsers}
              values={{
                users: data.stars.map(star => star.user.nickname).join(', '),
              }}
            />
          )}
        </Box>
      </Flex>
      <Flex width={1} justifyContent="space-around" alignItems="center">
        {userId && canAddStar && (
          <AddStarContent userId={userId} puzzleId={puzzleId} />
        )}
      </Flex>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(StarPopupContent);
