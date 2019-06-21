import React from 'react';
import styled from 'theme/styled';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedTime } from 'react-intl';

import { Panel } from 'components/General';
import HintDisplay from './HintDisplay';
import HintModeSelector from './HintModeSelector';

import { PuzzleHintProps } from './types';
import { StateType } from 'reducers/types';

const BottomRight = styled.div`
  float: right;
`;

const PuzzleHint = ({ hint, user, puzzleUser }: PuzzleHintProps) => (
  <Panel minHeight="2em" width={1} display="block">
    {user.id === puzzleUser.id ? (
      <HintModeSelector hint={hint} />
    ) : (
      <HintDisplay hint={hint} />
    )}
    <BottomRight>
      {hint.created && (
        <FormattedTime
          value={hint.created}
          year="numeric"
          month="short"
          day="numeric"
        />
      )}
    </BottomRight>
  </Panel>
);

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleHint);
