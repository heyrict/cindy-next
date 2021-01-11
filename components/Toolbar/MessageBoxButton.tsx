import React from 'react';

import { connect } from 'react-redux';
import * as directReducer from 'reducers/direct';

import { FormattedMessage } from 'react-intl';
import dmMessages from 'messages/components/dm';

import { Box, ButtonTransparent } from 'components/General';

import { ActionContentType } from 'reducers/types';
import { MessageBoxButtonProps } from './types';

const MessageBoxButton = ({ setTrueDirectModal }: MessageBoxButtonProps) => (
  <Box height={1} width={1}>
    <ButtonTransparent
      width={1}
      height={1}
      p={0}
      color="gray.1"
      fontWeight="bold"
      onClick={setTrueDirectModal}
    >
      <FormattedMessage {...dmMessages.directMessage} />
    </ButtonTransparent>
  </Box>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueDirectModal: () =>
    dispatch(directReducer.actions.directModal.setTrue()),
});

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(MessageBoxButton);
