import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Waypoint } from 'react-waypoint';
import { randomUUID } from 'common/random';

import messages from 'messages/common';
import { DelayRenderingProps } from './types';

class DelayRendering extends React.Component<DelayRenderingProps> {
  static defaultProps = {
    wait: 500,
  };

  state = {
    rendered: false,
  };
  key: string;
  timerHandle?: number;

  constructor(props: DelayRenderingProps) {
    super(props);
    this.key = props.key || randomUUID();

    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._onTimerEnds = this._onTimerEnds.bind(this);
  }

  _startTimer() {
    if (this.state.rendered) return;
    this.timerHandle = window.setTimeout(this._onTimerEnds, this.props.wait);
  }

  _onTimerEnds() {
    this._stopTimer();
    this.setState({ rendered: true });
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
        {this.state.rendered ? (
          this.props.children
        ) : this.props.loading || (
          <div>
            <FormattedMessage {...messages.loading} />
          </div>
        )}
      </Waypoint>
    );
  }
}

export default DelayRendering;
