import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import { randomUUID } from 'common';

class LoadMoreVis extends React.Component {
  static propTypes = {
    wait: PropTypes.number,
    loadMore: PropTypes.func.isRequired,
  };
  static defaultProps = {
    wait: 600,
  };

  state = {
    timerHandle: null,
  };

  constructor(props) {
    super(props);
    this.key = props.key || randomUUID();

    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._onTimerEnds = this._onTimerEnds.bind(this);
  }

  _startTimer() {
    this.setState({
      timerHandle: window.setTimeout(this._onTimerEnds, this.props.wait),
    });
  }

  _onTimerEnds() {
    this.props.loadMore();
    this._stopTimer();
  }

  _stopTimer() {
    window.clearTimeout(this.state.timerHandle);
    this.setState({
      timerHandle: null,
    });
  }

  render() {
    return (
      <Waypoint
        key={this.key}
        onEnter={this._startTimer}
        onLeave={this._stopTimer}
      >
        <div>{this.state.timerHandle ? 'Now Loading...' : 'Load More'}</div>
      </Waypoint>
    );
  }
}

export default LoadMoreVis;
