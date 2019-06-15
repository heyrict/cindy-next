import React, { useState } from 'react';
import { line2md } from 'common';

import { FormattedTime, FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';
import { ButtonTransparent, Img, EditTimeSpan } from 'components/General';
import SimpleEditor from 'components/PreviewEditor/simple';

import ChatBubble from './ChatBubble';
import ChatBubbleTop from './ChatBubbleTop';
import pencilIcon from 'svgs/pencil.svg';

import { ChatmessageProps, ChatmessageModeType } from './types';
import { StateType } from 'reducers/types';
import { CHATROOM_EDIT_MESSAGE_MUTATION } from 'graphql/Mutations/Chat';
import {
  ChatroomEditMessage,
  ChatroomEditMessageVariables,
} from 'graphql/Mutations/generated/ChatroomEditMessage';
import { Mutation } from 'react-apollo';

const Chatmessage = ({
  chatmessage,
  anonymous,
  currentUserId,
}: ChatmessageProps) => {
  const [mode, setMode] = useState<ChatmessageModeType>(
    ChatmessageModeType.NORMAL,
  );
  const isCreator = currentUserId === chatmessage.sui_hei_user.id;

  return (
    <div>
      <ChatBubbleTop>
        {anonymous ? (
          <AnonymousUserInline
            px={1}
            timestamp={
              chatmessage.created && (
                <FormattedTime
                  value={chatmessage.created}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              )
            }
          />
        ) : (
          <UserInline
            px={1}
            user={chatmessage.sui_hei_user}
            timestamp={
              chatmessage.created && (
                <FormattedTime
                  value={chatmessage.created}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              )
            }
          />
        )}
      </ChatBubbleTop>
      <ChatBubble orientation={isCreator ? 'right' : 'left'}>
        {mode === ChatmessageModeType.EDIT && (
          <Mutation<ChatroomEditMessage, ChatroomEditMessageVariables>
            mutation={CHATROOM_EDIT_MESSAGE_MUTATION}
          >
            {editMessage => (
              <SimpleEditor
                useNamespaces={['kameo', 'chef']}
                initialValue={chatmessage.content}
                autoFocus
                onSubmit={text => {
                  if (text === chatmessage.content) {
                    setMode(ChatmessageModeType.NORMAL);
                    return;
                  }
                  editMessage({
                    variables: {
                      chatmessageId: chatmessage.id,
                      content: text,
                    },
                  }).then(result => {
                    if (!result) return;
                    const { errors } = result;
                    if (errors) console.log(errors);
                    setMode(ChatmessageModeType.NORMAL);
                  });
                }}
              />
            )}
          </Mutation>
        )}
        <span
          dangerouslySetInnerHTML={{ __html: line2md(chatmessage.content) }}
        />
        {chatmessage.editTimes > 0 && (
          <EditTimeSpan>
            <FormattedMessage
              {...commonMessages.editTimes}
              values={{ count: chatmessage.editTimes }}
            />
          </EditTimeSpan>
        )}
        {isCreator && (
          <ButtonTransparent
            onClick={() =>
              setMode(
                mode === ChatmessageModeType.EDIT
                  ? ChatmessageModeType.NORMAL
                  : ChatmessageModeType.EDIT,
              )
            }
          >
            <Img height="xxs" src={pencilIcon} />
          </ButtonTransparent>
        )}
      </ChatBubble>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentUserId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Chatmessage);
