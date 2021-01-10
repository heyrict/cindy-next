import React from 'react';
import { toast } from 'react-toastify';
import {upsertItem} from 'common/update';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import {useMutation, useQuery} from '@apollo/client';
import {DM_READ_ALL_QUERY} from 'graphql/Queries/DirectMessage';
import {UPSERT_DM_READ_MUTATION} from 'graphql/Mutations/DirectMessage';
import {USER_BRIEF_FRAGMENT} from 'graphql/Fragments/User';

import { Flex, Box, Img, ButtonTransparent, RedDot } from 'components/General';
import Loading from 'components/General/Loading';
import messageIcon from 'svgs/message.svg';

import { StateType, ActionContentType } from 'reducers/types';
import {MessageGroupSelectProps} from './types';
import {DmReadAllQuery, DmReadAllQueryVariables} from 'graphql/Queries/generated/DmReadAllQuery';
import {UpsertDmReadMutation, UpsertDmReadMutationVariables} from 'graphql/Mutations/generated/UpsertDmReadMutation';
import {UserBrief} from 'graphql/Fragments/generated/UserBrief';

const MessageGroupSelectInner = ({
  userId,
  setDirectGroupUser,
  setDirectHasnew,
}: MessageGroupSelectProps) => {
  const { data, loading, error } = useQuery<DmReadAllQuery, DmReadAllQueryVariables>(DM_READ_ALL_QUERY, {
    variables: {
      userId,
      limit: 50,
      offset: 0,
    },
    onCompleted: ({ dmReadAll }) => {
      if (!dmReadAll) return;

      if (dmReadAll.some(entry => entry.dmId !== entry.directMessageId)) {
        setDirectHasnew(true);
      } else {
        setDirectHasnew(false);
      }
    },
  });

  const [upsertDmRead] = useMutation<UpsertDmReadMutation, UpsertDmReadMutationVariables>(UPSERT_DM_READ_MUTATION, {
    update: (cache, { data }) => {
      if (!data || !data.upsertDmRead) return;

      const directMessage = data.upsertDmRead;

      const cachedResult = cache.readQuery<
      DmReadAllQuery, Omit<DmReadAllQueryVariables, 'limit' | 'offset'>
      >({
        query: DM_READ_ALL_QUERY,
        variables: {
          userId,
        },
      });
      if (cachedResult === null) return;
      const { dmReadAll } = cachedResult;
      let withUser = cache.readFragment<UserBrief>({
        fragment: USER_BRIEF_FRAGMENT,
        fragmentName: "UserBrief",
        id: `User:${directMessage.withUserId}`,
      });
      cache.writeQuery<
      DmReadAllQuery, Omit<DmReadAllQueryVariables, 'limit' | 'offset'>
      >({
        query: DM_READ_ALL_QUERY,
        variables: {
          userId,
        },
        data: {
          dmReadAll: upsertItem(
            dmReadAll,
            {
              __typename: 'DmReadAllEntry',
              dmId: directMessage.id,
              directMessageId: directMessage.id,
              withUserId: directMessage.withUserId,
              withUser: {
                __typename: 'User',
                id: directMessage.withUserId,
                nickname: withUser?.nickname || '...',
              },
            },
            'withUserId',
            'desc',
          ),
        },
      });
    }
  });

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.dmReadAll) {
    if (loading) return <Loading centered />;
    return null;
  }
  const {dmReadAll} = data;

  return (
    <Flex flexWrap="wrap" alignItems="center">
      {dmReadAll.map(entry => (
        <Flex key={entry.withUser.id} mr={1}>
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
                setDirectGroupUser(entry.withUser.id);
                if (entry.dmId !== entry.directMessageId) {
                  upsertDmRead({
                    variables: {
                      userId,
                      withUserId: entry.withUser.id,
                      dmId: entry.directMessageId,
                    },
                    optimisticResponse: {
                      upsertDmRead: {
                        __typename: 'DmRead',
                        id: -1,
                        userId,
                        withUserId: entry.withUser.id,
                        dmId: entry.directMessageId,
                      },
                    },
                  });
                }
              }}
            >
              <Img src={messageIcon} height="xs" mr={2} alt="DM" />
              {entry.withUser.nickname}
              {entry.dmId !== entry.directMessageId && (
                <RedDot right={0} top={8} />
              )}
            </ButtonTransparent>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
}

const MessageGroupSelect = (props: Omit<MessageGroupSelectProps, 'userId'> & { userId: number | undefined }) => {
  return typeof props.userId === 'number' ? (
    <MessageGroupSelectInner {...props} userId={props.userId} />
  ) : null;
}

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
