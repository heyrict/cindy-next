import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { line2md } from 'common/markdown';

import { FormattedTime, FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Mutation } from '@apollo/react-components';
import { DIRECTMESSAGE_EDIT_MUTATION } from 'graphql/Mutations/Directmessage';

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
  DirectmessageEditMutation,
  DirectmessageEditMutationVariables,
} from 'graphql/Mutations/generated/DirectmessageEditMutation';

const Directmessage = ({
  directmessage,
  currentUserId,
}: DirectmessageProps) => {
  const [mode, setMode] = useState<DirectmessageModeType>(
    DirectmessageModeType.NORMAL,
  );
  const isCreator = currentUserId === directmessage.sender.id;

  return (
    <div>
      <ChatBubbleTop>
        <UserInline
          px={1}
          user={directmessage.sender}
          timestamp={
            directmessage.created && (
              <FormattedTime
                value={directmessage.created}
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
            <Mutation<
              DirectmessageEditMutation,
              DirectmessageEditMutationVariables
            >
              mutation={DIRECTMESSAGE_EDIT_MUTATION}
            >
              {editMessage => (
                <SimpleLegacyEditor
                  useNamespaces={[stampNamespaces.chef, stampNamespaces.kameo]}
                  initialValue={directmessage.content}
                  canExpand={false}
                  onSubmit={text => {
                    if (text === directmessage.content) {
                      setMode(DirectmessageModeType.NORMAL);
                      return;
                    }
                    setMode(DirectmessageModeType.NORMAL);
                    return editMessage({
                      variables: {
                        directmessageId: directmessage.id,
                        content: text,
                      },
                      optimisticResponse: {
                        update_sui_hei_directmessage: {
                          __typename: 'sui_hei_directmessage_mutation_response',
                          returning: [
                            {
                              __typename: 'sui_hei_directmessage',
                              ...directmessage,
                              content: text,
                            },
                          ],
                        },
                      },
                    }).then(result => {
                      if (result && result.errors) {
                        const { errors } = result;
                        toast.error(JSON.stringify(errors));
                        setMode(DirectmessageModeType.EDIT);
                      } else {
                        setMode(DirectmessageModeType.NORMAL);
                      }
                      return result;
                    });
                  }}
                />
              )}
            </Mutation>
          )}
          <span
            dangerouslySetInnerHTML={{ __html: line2md(directmessage.content) }}
          />
          {directmessage.editTimes > 0 && (
            <EditTimeSpan>
              <FormattedMessage
                {...commonMessages.editTimes}
                values={{ count: directmessage.editTimes }}
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
