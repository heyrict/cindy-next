import React from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as directReducer from 'reducers/direct';

import { Query } from 'react-apollo';
import { USER_BRIEF_QUERY } from 'graphql/Queries/User';

import { FormattedMessage } from 'react-intl';
import dmMessages from 'messages/components/dm';
import commonMessages from 'messages/common';

import { Button } from 'components/General';
import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';
import MessageGroupSelect from './MessageGroupSelect';
import MessageGroupChat from './MessageGroupChat';

import { StateType, ActionContentType } from 'reducers/types';
import { MessageBoxProps } from './types';
import {
  UserBriefQuery,
  UserBriefQueryVariables,
} from 'graphql/Queries/generated/UserBriefQuery';

export const MessageBox = ({
  directModal,
  directGroupUser,
  setFalseDirectModal,
  setDirectGroupUser,
}: MessageBoxProps) => (
  <Modal show={directModal} closefn={() => setFalseDirectModal()}>
    <ModalHeader>
      {directGroupUser ? (
        <Query<UserBriefQuery, UserBriefQueryVariables>
          query={USER_BRIEF_QUERY}
          variables={{ id: directGroupUser }}
        >
          {({ data, error }) => {
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (!data || !data.sui_hei_user_by_pk) return null;
            return (
              <React.Fragment>
                <Button mr={2} display="inline-box" onClick={() => setDirectGroupUser(null)}>
                  « <FormattedMessage {...commonMessages.back} />
                </Button>
                {data.sui_hei_user_by_pk.nickname}
              </React.Fragment>
            );
          }}
        </Query>
      ) : (
        <FormattedMessage {...dmMessages.directMessage} />
      )}
      <ModalCloseBtn onClick={() => setFalseDirectModal()} />
    </ModalHeader>
    <ModalBody>
      {directGroupUser ? <MessageGroupChat /> : <MessageGroupSelect />}
    </ModalBody>
  </Modal>
);

const mapStateToProps = (state: StateType) => ({
  directModal: directReducer.rootSelector(state).directModal,
  directGroupUser: directReducer.rootSelector(state).directGroupUser,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseDirectModal: () =>
    dispatch(directReducer.actions.directModal.setFalse()),
  setDirectGroupUser: (userId: number | null) =>
    dispatch(directReducer.actions.directGroupUser.set(userId)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(MessageBox);
