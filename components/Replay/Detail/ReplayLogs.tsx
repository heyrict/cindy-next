import React from 'react';

import { Flex } from 'components/General';
import ReplayLog from './ReplayLog';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';

import { ReplayLogsProps } from './types';
import { StateType } from 'reducers/types';

const ReplayLogs = ({ dialogues, logs }: ReplayLogsProps) => (
  <Flex width={1} flexWrap="wrap">
    {logs.map((log, index) => (
      <ReplayLog
        key={`replay-log-${index}-${log}`}
        qno={index}
        dialogue={dialogues.find(d => d.id === log)}
      />
    ))}
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  logs: replayReducer.rootSelector(state).logs,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ReplayLogs);
