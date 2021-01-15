import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { line2md } from 'common/markdown';

import { FormattedTime, FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { useMutation } from '@apollo/client';
import { UPDATE_DIRECT_MESSAGE_MUTATION } from 'graphql/Mutations/DirectMessage';

import UserInline from 'components/User/UserInline';
import { ButtonTransparent, Img, EditTimeSpan } from 'components/General';
import { SimpleLegacyEditor } from 'components/PreviewEditor';

import ChatBubble from './Chatmessage/ChatBubble';
import ChatBubbleTop from './Chatmessage/ChatBubbleTop';
import pencilIcon from 'svgs/pencil.svg';

import { StateType } from 'reducers/types';
import { stampNamespaces } from 'stamps';
import { DirectmessageProps, DirectmessageModeType } from './types';
import {
  UpdateDirectMessageMutation,
  UpdateDirectMessageMutationVariables,
} from 'graphql/Mutations/generated/UpdateDirectMessageMutation';

const Directmessage = ({
  directMessage,
  currentUserId,
}: DirectmessageProps) => {
  const [mode, setMode] = useState<DirectmessageModeType>(
    DirectmessageModeType.NORMAL,
  );

  const [updateDirect] = useMutation<
    UpdateDirectMessageMutation,
    UpdateDirectMessageMutationVariables
  >(UPDATE_DIRECT_MESSAGE_MUTATION, {
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
      setMode(DirectmessageModeType.EDIT);
    },
    onCompleted: () => {
      setMode(DirectmessageModeType.NORMAL);
    },
  });

  const isCreator = currentUserId === directMessage.sender.id;

  return (
    <div>
      <ChatBubbleTop>
        <UserInline
          px={1}
          user={directMessage.sender}
          timestamp={
            directMessage.created && (
              <FormattedTime
                value={directMessage.created}
                year="numeric"
                month="short"
                day="numeric"
              />
            )
          }
        />
      </ChatBubbleTop>
      <ChatBubble orientation={isCreator ? 'right' : 'left'}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          {mode === DirectmessageModeType.EDIT && (
            <SimpleLegacyEditor
              useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
              initialValue={directMessage.content}
              canExpand={false}
              onSubmit={text => {
                if (text === directMessage.content) {
                  setMode(DirectmessageModeType.NORMAL);
                  return;
                }
                setMode(DirectmessageModeType.NORMAL);
                return updateDirect({
                  variables: {
                    id: directMessage.id,
                    content: text,
                  },
                  optimisticResponse: {
                    updateDirectMessage: {
                      ...directMessage,
                      content: text,
                    },
                  },
                });
              }}
            />
          )}
          <span
            dangerouslySetInnerHTML={{
              __html: line2md(directMessage.content),
            }}
          />
          {directMessage.editTimes > 0 && (
            <EditTimeSpan>
              <FormattedMessage
                {...commonMessages.editTimes}
                values={{ count: directMessage.editTimes }}
              />
            </EditTimeSpan>
          )}
          {isCreator && (
            <ButtonTransparent
              onClick={() =>
                setMode(
                  mode === DirectmessageModeType.EDIT
                    ? DirectmessageModeType.NORMAL
                    : DirectmessageModeType.EDIT,
                )
              }
            >
              <Img height="xxs" src={pencilIcon} />
            </ButtonTransparent>
          )}
        </div>
      </ChatBubble>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentUserId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Directmessage);
