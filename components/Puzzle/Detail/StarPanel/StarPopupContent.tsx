import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Flex, Box } from 'components/General';

import { Query, Mutation } from 'react-apollo';
import { PUZZLE_STAR_QUERY } from 'graphql/Queries/Star';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { MAX_DISPLAY_STAR_USERS } from './constants';

import { StarPopupContentProps } from './types';
import {
  PuzzleStarQuery,
  PuzzleStarQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarQuery';
import { ADD_STAR_MUTATION } from 'graphql/Mutations/Star';
import { AddStarMutation, AddStarMutationVariables } from 'graphql/Mutations/generated/AddStarMutation';

const StarPopupContent = ({
  puzzleId,
  starCount,
  setShow,
  buttonRef,
}: StarPopupContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    return window.addEventListener('click', e => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node | null) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node | null)
      ) {
        setShow(false);
      }
    });
  }, []);

  return (
    <Flex ref={contentRef} width={1} flexWrap="wrap">
      <Query<PuzzleStarQuery, PuzzleStarQueryVariables>
        query={PUZZLE_STAR_QUERY}
        variables={{ puzzleId, limit: MAX_DISPLAY_STAR_USERS }}
      >
        {({ data, error }) => {
          if (error) {
            toast.error(error.message);
            return null;
          }
          if (!data || !data.sui_hei_star) return null;
          return (
            <Box width={1} mb={2}>
              {MAX_DISPLAY_STAR_USERS < starCount ? (
                <FormattedMessage
                  {...puzzleMessages.starUsersWithExtra}
                  values={{
                    users: data.sui_hei_star
                      .slice(0, MAX_DISPLAY_STAR_USERS)
                      .map(star => star.sui_hei_user.nickname)
                      .join(', '),
                    count: starCount - MAX_DISPLAY_STAR_USERS,
                  }}
                />
              ) : (
                <FormattedMessage
                  {...puzzleMessages.starUsers}
                  values={{
                    users: data.sui_hei_star
                      .map(star => star.sui_hei_user.nickname)
                      .join(', '),
                  }}
                />
              )}
            </Box>
          );
        }}
      </Query>
      <Mutation<AddStarMutation, AddStarMutationVariables> mutation={ADD_STAR_MUTATION}>
        {_addStar => null}
      </Mutation>
    </Flex>
  );
};

export default StarPopupContent;
