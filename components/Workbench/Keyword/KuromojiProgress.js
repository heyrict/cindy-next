import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import ProgressBar from 'components/General/ProgressBar';

const KuromojiProgress = ({ progress }) => <ProgressBar progress={progress} />;

KuromojiProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  progress: addReplayReducer.rootSelector(state).kuromojiProgress,
});

const withRedux = connect(mapStateToProps);

export default withRedux(KuromojiProgress);
