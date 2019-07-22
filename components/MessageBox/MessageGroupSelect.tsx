import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { Query } from 'react-apollo';
import { DIRECTMESSAGE_GROUP_QUERY } from 'graphql/Queries/Directmessage';

import { Flex, Box, Img, ButtonTransparent } from 'components/General';
import messageIcon from 'svgs/message.svg';

import { StateType, ActionContentType } from 'reducers/types';
import {
  DirectmessageGroupQuery,
  DirectmessageGroupQueryVariables,
} from 'graphql/Queries/generated/DirectmessageGroupQuery';
import { MessageGroupSelectProps } from './types';

const MessageGroupSelect = ({
  userId,
  setDirectGroupUser,
}: MessageGroupSelectProps) =>
  userId ? (
    <Query<DirectmessageGroupQuery, DirectmessageGroupQueryVariables>
      query={DIRECTMESSAGE_GROUP_QUERY}
      variables={{ userId }}
    >
      {({ data, error }) => {
        if (error) {
          toast.error(error.message);
          return null;
        }
        if (!data || !data.direct_message_group) return null;
        return (
          <Flex flexWrap="wrap" alignItems="center">
            {data.direct_message_group.map(grp => (
              <Flex key={grp.sui_hei_user.id} mr={1}>
                <Box m={1} borderRadius={2} bg="rgba(255, 255, 255, 0.5)">
                  <ButtonTransparent
                    py={2}
                    width={1}
                    onClick={() => setDirectGroupUser(grp.sui_hei_user.id)}
                  >
                    <Img src={messageIcon} height="xs" mr={2} alt="DM" />
                    {grp.sui_hei_user.nickname}
                  </ButtonTransparent>
                </Box>
              </Flex>
            ))}
          </Flex>
        );
      }}
    </Query>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setDirectGroupUser: (userId: number) =>
    dispatch(directReducer.actions.directGroupUser.set(userId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(MessageGroupSelect);
