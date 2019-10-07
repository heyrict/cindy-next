import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import StarInput from 'components/Star/StarInput';

import { Query, Mutation } from 'react-apollo';
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

import { StarPopupContentProps } from './types';
import {
  PuzzleStarQuery,
  PuzzleStarQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarQuery';
import { ADD_STAR_MUTATION } from 'graphql/Mutations/Star';
import {
  AddStarMutation,
  AddStarMutationVariables,
} from 'graphql/Mutations/generated/AddStarMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';
import {
  PreviousStarValueQuery,
  PreviousStarValueQueryVariables,
} from 'graphql/Queries/generated/PreviousStarValueQuery';
import { StateType } from 'reducers/types';

const StarPopupContent = ({
  userId,
  puzzleId,
  starCount,
  setShow,
  buttonRef,
  canAddStar,
}: StarPopupContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null!);
  const notifHdlRef = useRef<React.ReactText | null>(null);

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

  return (
    <Flex ref={contentRef} width={1} flexWrap="wrap">
      <Query<PuzzleStarQuery, PuzzleStarQueryVariables>
        query={PUZZLE_STAR_QUERY}
        variables={{ puzzleId, limit: MAX_DISPLAY_STAR_USERS }}
      >
        {({ data, error, loading }) => {
          if (error) {
            toast.error(error.message);
            return null;
          }
          if (!data || !data.sui_hei_star) {
            if (loading) return <Loading centered />;
            return null;
          }
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
      <Flex width={1} justifyContent="space-around" alignItems="center">
        {userId && canAddStar && (
          <Query<PreviousStarValueQuery, PreviousStarValueQueryVariables>
            query={PREVIOUS_STAR_VALUE_QUERY}
            variables={{
              puzzleId,
              userId,
            }}
          >
            {({ data, error, loading }) => {
              if (error) {
                toast.error(error.message);
                return null;
              }
              if (!data || !data.sui_hei_star) {
                if (loading) return <Loading centered />;
                return null;
              }
              const initialValue =
                data.sui_hei_star.length === 0 ? 0 : data.sui_hei_star[0].value;
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
                  <Mutation<AddStarMutation, AddStarMutationVariables>
                    mutation={ADD_STAR_MUTATION}
                    update={(proxy, { data }) => {
                      if (
                        !data ||
                        !data.insert_sui_hei_star ||
                        data.insert_sui_hei_star.returning.length === 0
                      )
                        return;
                      const newStar = data.insert_sui_hei_star.returning[0];
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
                          sui_hei_star: [{ ...newStar }],
                        },
                      });
                    }}
                  >
                    {addStar => (
                      <StarInput
                        initialValue={initialValue}
                        onChange={value => {
                          addStar({
                            variables: {
                              puzzleId,
                              value,
                            },
                            optimisticResponse: {
                              insert_sui_hei_star: {
                                __typename: 'sui_hei_star_mutation_response',
                                returning: [
                                  {
                                    __typename: 'sui_hei_star',
                                    id:
                                      data.sui_hei_star.length > 0
                                        ? data.sui_hei_star[0].id
                                        : -1,
                                    value,
                                  },
                                ],
                              },
                            },
                          })
                            .then(res => {
                              if (!res) return;
                              const { errors } = res;
                              if (errors) {
                                toast.error(JSON.stringify(errors));
                              } else {
                                if (notifHdlRef.current)
                                  toast.dismiss(notifHdlRef.current);
                                toast.info(
                                  <FormattedMessage
                                    {...commonMessages.saved}
                                  />,
                                );
                              }
                            })
                            .catch((e: ApolloError) => {
                              if (notifHdlRef.current)
                                toast.dismiss(notifHdlRef.current);
                              toast.error(e.message);
                            });
                          notifHdlRef.current = toast.info(
                            <FormattedMessage {...commonMessages.saving} />,
                          );
                        }}
                      />
                    )}
                  </Mutation>
                </>
              );
            }}
          </Query>
        )}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(StarPopupContent);
