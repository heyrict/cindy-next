import React from 'react';

import { Query } from 'react-apollo';
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
        query={USERAWARD_CHECKER_QUERY}
        variables={{
          userId: user.id,
        }}
        onCompleted={data => {
          if (!data.sui_hei_user_by_pk) return;
          const user = data.sui_hei_user_by_pk;
          initAwardCount({
            puzzles:
              (user.sui_hei_puzzles_aggregate &&
                user.sui_hei_puzzles_aggregate.aggregate &&
                user.sui_hei_puzzles_aggregate.aggregate.count) ||
              0,
            goodQuestions:
              (user.good_questions_aggregate &&
                user.good_questions_aggregate.aggregate &&
                user.good_questions_aggregate.aggregate.count) ||
              0,
            trueAnswers:
              (user.true_answers_aggregate &&
                user.true_answers_aggregate.aggregate &&
                user.true_answers_aggregate.aggregate.count) ||
              0,
            dialogues:
              (user.sui_hei_dialogues_aggregate &&
                user.sui_hei_dialogues_aggregate.aggregate &&
                user.sui_hei_dialogues_aggregate.aggregate.count) ||
              0,
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

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(AwardChecker);
