import React from 'react';

import { Query } from '@apollo/client/react/components';
import { USERAWARD_CHECKER_QUERY } from 'graphql/Queries/User';

import CheckNotifier from './CheckNotifier';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as awardCheckerReducer from 'reducers/awardChecker';

import { ActionContentType, StateType } from 'reducers/types';
import {
  UserawardCheckerQuery,
  UserawardCheckerQueryVariables,
} from 'graphql/Queries/generated/UserawardCheckerQuery';
import { AwardCheckerProps } from './types';

const AwardChecker = ({ user, initAwardCount }: AwardCheckerProps) => {
  return user.id ? (
    <React.Fragment>
      <Query<UserawardCheckerQuery, UserawardCheckerQueryVariables>
        ssr={false}
        query={USERAWARD_CHECKER_QUERY}
        variables={{
          userId: user.id,
        }}
        onCompleted={data => {
          if (!data.user) return;
          const user = data.user;
          initAwardCount({
            puzzles: user.puzzleCount,
            goodQuestions: user.goodQuestionCount,
            trueAnswers: user.trueAnswerCount,
            dialogues: user.dialogueCount,
          });
        }}
      >
        {() => null}
      </Query>
      <CheckNotifier />
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  initAwardCount: (state: typeof awardCheckerReducer.initialState) =>
    dispatch(awardCheckerReducer.actions.initialize(state)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(AwardChecker);
