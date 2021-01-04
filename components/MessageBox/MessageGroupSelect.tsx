import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { Query, Mutation } from '@apollo/client/react/components';
import { DIRECT_MESSAGE_GROUP_QUERY } from 'graphql/Queries/Directmessage';
import { USER_LAST_READ_DM_QUERY } from 'graphql/Queries/User';
import { SET_LAST_READ_DM_MUTATION } from 'graphql/Mutations/User';

import { Flex, Box, Img, ButtonTransparent, RedDot } from 'components/General';
import Loading from 'components/General/Loading';
import messageIcon from 'svgs/message.svg';

import { StateType, ActionContentType } from 'reducers/types';
import {
  DirectMessageGroupQuery,
  DirectMessageGroupQueryVariables,
} from 'graphql/Queries/generated/DirectMessageGroupQuery';
import {
  MessageGroupSelectProps,
  MessageGroupSelectRendererProps,
} from './types';
import {
  UserLastReadDmQuery,
  UserLastReadDmQueryVariables,
} from 'graphql/Queries/generated/UserLastReadDmQuery';
import {
  SetLastReadDmMutationVariables,
  SetLastReadDmMutation,
} from 'graphql/Mutations/generated/SetLastReadDmMutation';

const MessageGroupSelectRenderer = ({
  userId,
  setDirectGroupUser,
  setDirectHasnew,
  data,
  loading,
  error,
}: MessageGroupSelectRendererProps) => {
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.direct_message_group) {
    if (loading) return <Loading centered />;
    return null;
  }
  const directMessageGroup = data.direct_message_group;

  return (
    <React.Fragment>
      <Query<UserLastReadDmQuery, UserLastReadDmQueryVariables>
        query={USER_LAST_READ_DM_QUERY}
        variables={{ id: userId }}
        onCompleted={data => {
          if (!data || !data.user) return;
          const lastReadId = data.user.last_read_dm_id;
          if (!lastReadId) return;

          if (directMessageGroup.some(grp => grp.last_dm_id > lastReadId))
            setDirectHasnew(true);
          else setDirectHasnew(false);
        }}
      >
        {({ data: userData, error, loading }) => {
          if (error) {
            toast.error(error.message);
            return null;
          }
          if (!userData || !userData.user) {
            if (loading) return <Loading centered />;
            return null;
          }
          const lastReadId = userData.user.last_read_dm_id || -1;
          return (
            <Mutation<SetLastReadDmMutation, SetLastReadDmMutationVariables>
              mutation={SET_LAST_READ_DM_MUTATION}
            >
              {setLastReadDm => (
                <Flex flexWrap="wrap" alignItems="center">
                  {directMessageGroup.map(grp => (
                    <Flex key={grp.user.id} mr={1}>
                      <Box
                        style={{ position: 'relative' }}
                        m={1}
                        borderRadius={2}
                        bg="rgba(255, 255, 255, 0.5)"
                      >
                        <ButtonTransparent
                          py={2}
                          width={1}
                          onClick={() => {
                            setDirectGroupUser(grp.user.id);
                            if (grp.last_dm_id > lastReadId) {
                              setLastReadDm({
                                variables: {
                                  userId,
                                  directMessageId: grp.last_dm_id,
                                },
                                optimisticResponse: {
                                  update_user: {
                                    __typename: 'user_mutation_response',
                                    returning: [
                                      {
                                        __typename: 'user',
                                        id: userId,
                                        last_read_dm_id: grp.last_dm_id,
                                      },
                                    ],
                                  },
                                },
                              });
                            }
                          }}
                        >
                          <Img src={messageIcon} height="xs" mr={2} alt="DM" />
                          {grp.user.nickname}
                          {grp.last_dm_id > (lastReadId || 1e8) && (
                            <RedDot right={0} top={8} />
                          )}
                        </ButtonTransparent>
                      </Box>
                    </Flex>
                  ))}
                </Flex>
              )}
            </Mutation>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

const MessageGroupSelect = ({
  userId,
  setDirectGroupUser,
  setDirectHasnew,
}: MessageGroupSelectProps) =>
  userId ? (
    <Query<DirectMessageGroupQuery, DirectMessageGroupQueryVariables>
      query={DIRECT_MESSAGE_GROUP_QUERY}
      variables={{ userId }}
    >
      {params => (
        <MessageGroupSelectRenderer
          userId={userId}
          setDirectGroupUser={setDirectGroupUser}
          setDirectHasnew={setDirectHasnew}
          {...params}
        />
      )}
    </Query>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setDirectGroupUser: (userId: number) =>
    dispatch(directReducer.actions.directGroupUser.set(userId)),
  setDirectHasnew: (hasnew: boolean) =>
    dispatch(directReducer.actions.directHasnew.set(hasnew)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(MessageGroupSelect);
