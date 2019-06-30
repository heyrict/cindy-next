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

const AwardChecker = ({
  user,
  setPuzzles,
  setGoodQuestions,
  setTrueAnswers,
  setDialogues,
  setComments,
  setStars,
}: AwardCheckerProps) => {
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
          // puzzle count
          if (
            user.sui_hei_puzzles_aggregate &&
            user.sui_hei_puzzles_aggregate.aggregate
          ) {
            setPuzzles(user.sui_hei_puzzles_aggregate.aggregate.count || 0);
          }
          // good question count
          if (
            user.good_questions_aggregate &&
            user.good_questions_aggregate.aggregate
          ) {
            setGoodQuestions(
              user.good_questions_aggregate.aggregate.count || 0,
            );
          }
          // true answer count
          if (
            user.true_answers_aggregate &&
            user.true_answers_aggregate.aggregate
          ) {
            setTrueAnswers(user.true_answers_aggregate.aggregate.count || 0);
          }
          // dialogue count
          if (
            user.sui_hei_dialogues_aggregate &&
            user.sui_hei_dialogues_aggregate.aggregate
          ) {
            setDialogues(user.sui_hei_dialogues_aggregate.aggregate.count || 0);
          }
          // comment count
          if (
            user.sui_hei_comments_aggregate &&
            user.sui_hei_comments_aggregate.aggregate
          ) {
            setComments(user.sui_hei_comments_aggregate.aggregate.count || 0);
          }
          // star count
          if (
            user.sui_hei_stars_aggregate &&
            user.sui_hei_stars_aggregate.aggregate
          ) {
            setStars(user.sui_hei_stars_aggregate.aggregate.count || 0);
          }
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
  setPuzzles: (value: number) =>
    dispatch(awardCheckerReducer.actions.setPuzzles(value)),
  setGoodQuestions: (value: number) =>
    dispatch(awardCheckerReducer.actions.setGoodQuestions(value)),
  setTrueAnswers: (value: number) =>
    dispatch(awardCheckerReducer.actions.setTrueAnswers(value)),
  setDialogues: (value: number) =>
    dispatch(awardCheckerReducer.actions.setDialogues(value)),
  setComments: (value: number) =>
    dispatch(awardCheckerReducer.actions.setComments(value)),
  setStars: (value: number) =>
    dispatch(awardCheckerReducer.actions.setStars(value)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(AwardChecker);
