import React from 'react';
import Head from 'next/head';

import { compose } from 'redux';
import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as loginReducer from 'reducers/login';

import Heading from 'components/General/Heading';
import ButtonTransparent from 'components/General/ButtonTransparent';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import PuzzleAddForm from 'components/PuzzleAddForm';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from 'messages/pages/add_puzzle';
import commonMessages from 'messages/common';
import authMessages from 'messages/components/auth';

import { StateType, ActionContentType } from 'reducers/types';
import { AddPuzzleProps } from 'pageTypes';

class AddPuzzle extends React.Component<AddPuzzleProps> {
  render() {
    const _ = this.props.intl.formatMessage;

    return (
      <React.Fragment>
        <Head>
          <title>{_(messages.title)} | Cindy</title>
          <meta name="description" content={_(messages.description)} />
        </Head>
        <Heading>
          <FormattedMessage {...messages.header} />
        </Heading>
        <PuzzleSubbar />
        {this.props.user.id ? (
          <PuzzleAddForm />
        ) : (
          <FormattedMessage
            {...commonMessages.loginOrSignup}
            values={{
              login: (
                <ButtonTransparent
                  color="blue.6"
                  px={1}
                  onClick={() => this.props.setTrueLoginModal()}
                >
                  <FormattedMessage {...authMessages.login} />
                </ButtonTransparent>
              ),
              signup: (
                <ButtonTransparent
                  color="blue.6"
                  px={1}
                  onClick={() => this.props.setTrueSignupModal()}
                >
                  <FormattedMessage {...authMessages.signup} />
                </ButtonTransparent>
              ),
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueLoginModal: () => dispatch(loginReducer.actions.loginModal.setTrue()),
  setTrueSignupModal: () =>
    dispatch(loginReducer.actions.signupModal.setTrue()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withRedux,
)(AddPuzzle);
