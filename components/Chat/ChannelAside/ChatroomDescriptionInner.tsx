import React, { useState, useEffect } from 'react';
import { line2md } from 'common/markdown';

import { Mutation } from '@apollo/react-components';
import { UPDATE_CHATROOM_DESCRIPTION_MUTATION } from 'graphql/Mutations/Chat';

import { Box, Img, ButtonTransparent } from 'components/General';
import { SimpleLegacyEditor } from 'components/PreviewEditor';
import pencilIcon from 'svgs/pencil.svg';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import {
  UpdateChatroomDescriptionMutation,
  UpdateChatroomDescriptionMutationVariables,
} from 'graphql/Mutations/generated/UpdateChatroomDescriptionMutation';
import { StateType } from 'reducers/types';
import { ChatroomDescriptionInnerProps } from './types';

const ChatroomDescriptionInner = ({
  chatroom,
  userId,
}: ChatroomDescriptionInnerProps) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(false);
  }, [chatroom.id]);

  return edit ? (
    <Mutation<
      UpdateChatroomDescriptionMutation,
      UpdateChatroomDescriptionMutationVariables
    >
      mutation={UPDATE_CHATROOM_DESCRIPTION_MUTATION}
    >
      {updateDescription => (
        <Box overflow="auto" flexGrow={1} bg="orange.2" color="orange.9" py={2}>
          <SimpleLegacyEditor
            initialValue={chatroom.description}
            onSubmit={description => {
              setEdit(false);
              if (description.trim() !== chatroom.description.trim()) {
                return updateDescription({
                  variables: {
                    chatroomId: chatroom.id,
                    description,
                  },
                });
              }
              return new Promise(resolve => resolve());
            }}
          />
        </Box>
      )}
    </Mutation>
  ) : (
    <Box overflow="auto" flexGrow={1} bg="orange.2" color="orange.9" py={2}>
      {chatroom.description ? (
        <div
          style={{ minHeight: '3em' }}
          dangerouslySetInnerHTML={{
            __html: line2md(chatroom.description),
          }}
        />
      ) : (
        <p>
          <FormattedMessage {...chatMessages.noDescription} />
        </p>
      )}
      {userId === chatroom.sui_hei_user.id && (
        <ButtonTransparent onClick={() => setEdit(true)}>
          <Img src={pencilIcon} size="xxs" />
        </ButtonTransparent>
      )}
    </Box>
  );
};

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ChatroomDescriptionInner);
