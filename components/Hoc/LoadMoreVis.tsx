import React from 'react';
import { Waypoint } from 'react-waypoint';
import { randomUUID } from 'common/random';

import Loading from 'components/General/Loading';

import { LoadMoreVisProps } from './types';

class LoadMoreVis extends React.Component<LoadMoreVisProps> {
  static defaultProps = {
    wait: 500,
  };

  timerHandle?: number;
  key: string;

  constructor(props: LoadMoreVisProps) {
    super(props);
    this.key = props.key || randomUUID();

    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._onTimerEnds = this._onTimerEnds.bind(this);
  }

  _startTimer() {
    this.timerHandle = window.setTimeout(this._onTimerEnds, this.props.wait);
  }

  _onTimerEnds() {
    this.props.loadMore();
    this._stopTimer();
  }

  _stopTimer() {
    if (this.timerHandle === undefined) return;
    window.clearTimeout(this.timerHandle);
    this.timerHandle = undefined;
  }

  render() {
    return (
      <Waypoint
        key={this.key}
        onEnter={this._startTimer}
        onLeave={this._stopTimer}
      >
        {this.props.children || (
          <div>
            <Loading centered />
          </div>
        )}
      </Waypoint>
    );
  }
}

export default LoadMoreVis;
