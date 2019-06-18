import React from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import ProgressBar from 'components/General/ProgressBar';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

import { KuromojiProgressProps } from './types';
import { StateType } from 'reducers/types';

const KuromojiProgress = ({ progress }: KuromojiProgressProps) => (
  <React.Fragment>
    {progress !== 1 && (
      <span style={{ width: '100%', textAlign: 'center' }}>
        <FormattedMessage {...messages.firstLoadingIsTimeConsuming} />
      </span>
    )}
    <ProgressBar progress={progress} />
  </React.Fragment>
);

const mapStateToProps = (state: StateType) => ({
  progress: addReplayReducer.rootSelector(state).kuromojiProgress,
});

const withRedux = connect(mapStateToProps);

export default withRedux(KuromojiProgress);
