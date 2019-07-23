import React from 'react';
import { updateItem, upsertItem } from 'common/update';
import { maybeSendNotification } from 'common/web-notify';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { FormattedMessage } from 'react-intl';
import webNotifyMessages from 'messages/webNotify';

import { Query, Subscription, Mutation } from 'react-apollo';
import {
  DIRECTMESSAGE_GROUP_QUERY,
  DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
} from 'graphql/Queries/Directmessage';
import { USER_LAST_READ_DM_QUERY } from 'graphql/Queries/User';
import { DIRECTMESSAGE_SUBSCRIPTION } from 'graphql/Subscriptions/Directmessage';
import { SET_LAST_READ_DM_MUTATION } from 'graphql/Mutations/User';

import { Flex, Box, Img, ButtonTransparent, RedDot } from 'components/General';
import messageIcon from 'svgs/message.svg';

import { StateType, ActionContentType } from 'reducers/types';
import {
  DirectmessageGroupQuery,
  DirectmessageGroupQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupQuery';
import {
  MessageGroupSelectProps,
  MessageGroupSelectRendererProps,
} from './types';
import {
  UserLastReadDmQuery,
  UserLastReadDmQueryVariables,
} from 'graphql/Queries/generated/UserLastReadDmQuery';
import {
  DirectmessageSubscription,
  DirectmessageSubscriptionVariables,
} from 'graphql/Subscriptions/generated/DirectmessageSubscription';
import {
  DirectmessageGroupMessagesQuery,
  DirectmessageGroupMessagesQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupMessagesQuery';
import { EventType } from 'generated/globalSubscriptionType';
import {
  SetLastReadDmMutationVariables,
  SetLastReadDmMutation,
} from 'graphql/Mutations/generated/SetLastReadDmMutation';

const MessageGroupSelectRenderer = ({
  userId,
  setDirectGroupUser,
  setDirectHasnew,
  data,
  error,
}: MessageGroupSelectRendererProps) => {
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.direct_message_group) return null;
  const directMessageGroup = data.direct_message_group;

  return (
    <React.Fragment>
      <Subscription<
        DirectmessageSubscription,
        DirectmessageSubscriptionVariables
      >
        subscription={DIRECTMESSAGE_SUBSCRIPTION}
        onSubscriptionData={({ client, subscriptionData }) => {
          const { data } = subscriptionData;
          if (
            !data ||
            !data.directmessageSub ||
            !data.directmessageSub.sui_hei_directmessage
          )
            return;
          const newDirectmessage = data.directmessageSub.sui_hei_directmessage;
          const withUser =
            newDirectmessage.receiver.id === userId
              ? newDirectmessage.sender
              : newDirectmessage.receiver;

          // Notification
          if (data.directmessageSub.eventType === EventType.INSERT) {
            setDirectHasnew(true);
            toast.info(
              <FormattedMessage
                {...webNotifyMessages.newDMReceived}
                values={{ user: withUser.nickname }}
              />,
            );
          }
          maybeSendNotification('New Direct Message', {
            body: `FROM ${withUser.nickname}:  ${newDirectmessage.content}`,
            renotify: true,
          });

          // Update chat groups
          const chatGroupsData = client.readQuery<
            DirectmessageGroupQuery,
            DirectmessageGroupQueryVariables
          >({
            query: DIRECTMESSAGE_GROUP_QUERY,
            variables: { userId },
          });
          if (chatGroupsData !== null) {
            client.writeQuery<
              DirectmessageGroupQuery,
              DirectmessageGroupQueryVariables
            >({
              query: DIRECTMESSAGE_GROUP_QUERY,
              variables: { userId },
              data: {
                direct_message_group: updateItem(
                  chatGroupsData.direct_message_group,
                  {
                    __typename: 'hasura_directmessage_group_trigger',
                    last_dm_id: newDirectmessage.id,
                    user_id: withUser.id,
                    sui_hei_user: withUser,
                  },
                  'user_id',
                ),
              },
            });
          }

          // Update chat messages
          const chatMessagesData = client.readQuery<
            DirectmessageGroupMessagesQuery,
            DirectmessageGroupMessagesQueryVariables
          >({
            query: DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
            variables: {
              userId,
              withUserId: withUser.id,
            },
          });
          if (chatMessagesData !== null) {
            client.writeQuery<
              DirectmessageGroupMessagesQuery,
              DirectmessageGroupMessagesQueryVariables
            >({
              query: DIRECTMESSAGE_GROUP_MESSAGES_QUERY,
              variables: {
                userId,
                withUserId: withUser.id,
              },
              data: {
                sui_hei_directmessage:
                  newDirectmessage.id === -1
                    ? [
                        newDirectmessage,
                        ...chatMessagesData.sui_hei_directmessage,
                      ]
                    : upsertItem(
                        chatMessagesData.sui_hei_directmessage,
                        newDirectmessage,
                        'id',
                        'desc',
                      ),
              },
            });
          }
        }}
      />
      <Query<UserLastReadDmQuery, UserLastReadDmQueryVariables>
        query={USER_LAST_READ_DM_QUERY}
        variables={{ id: userId }}
        onCompleted={data => {
          if (!data || !data.sui_hei_user_by_pk) return;
          const lastReadId = data.sui_hei_user_by_pk.last_read_dm_id;
          if (!lastReadId) return;

          if (directMessageGroup.some(grp => grp.last_dm_id > lastReadId))
            setDirectHasnew(true);
          else
            setDirectHasnew(false);
        }}
      >
        {({ data: userData, error }) => {
          if (error) {
            toast.error(error.message);
            return null;
          }
          if (!userData || !userData.sui_hei_user_by_pk) return null;
          const lastReadId = userData.sui_hei_user_by_pk.last_read_dm_id || -1;
          return (
            <Mutation<SetLastReadDmMutation, SetLastReadDmMutationVariables>
              mutation={SET_LAST_READ_DM_MUTATION}
            >
              {setLastReadDm => (
                <Flex flexWrap="wrap" alignItems="center">
                  {directMessageGroup.map(grp => (
                    <Flex key={grp.sui_hei_user.id} mr={1}>
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
                            setDirectGroupUser(grp.sui_hei_user.id);
                            if (grp.last_dm_id > lastReadId) {
                              setLastReadDm({
                                variables: {
                                  userId,
                                  directMessageId: grp.last_dm_id,
                                },
                                optimisticResponse: {
                                  update_sui_hei_user: {
                                    __typename: 'sui_hei_user_mutation_response',
                                    returning: [
                                      {
                                        __typename: 'sui_hei_user',
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
                          {grp.sui_hei_user.nickname}
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
    <Query<DirectmessageGroupQuery, DirectmessageGroupQueryVariables>
      query={DIRECTMESSAGE_GROUP_QUERY}
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
