import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => (
  <div>{Math.floor(progress * 1000) / 10} %</div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
