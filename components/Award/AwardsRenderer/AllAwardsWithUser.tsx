import React from 'react';
import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';
import AllAwards from './AllAwards';

import { connect } from 'react-redux';
import * as awardCheckerReducer from 'reducers/awardChecker';

import { Query } from '@apollo/react-components';
import { AWARDS_INFO_QUERY } from 'graphql/Queries/Awards';

import {
  AwardsInfoQuery,
  AwardsInfoQueryVariables,
} from 'graphql/Queries/generated/AwardsInfoQuery';
import { AllAwardsWithUserProps } from './types';
import { ActionContentType } from 'reducers/types';

const AllAwardsWithUser = ({
  userId,
  initAwardCount,
}: AllAwardsWithUserProps) => (
  <Query<AwardsInfoQuery, AwardsInfoQueryVariables>
    query={AWARDS_INFO_QUERY}
    variables={{ userId }}
    fetchPolicy="cache-and-network"
    onCompleted={data => {
      if (!data.user) return;
      const user = data.user;
      initAwardCount({
        puzzles:
          (user.puzzles_aggregate &&
            user.puzzles_aggregate.aggregate &&
            user.puzzles_aggregate.aggregate.count) ||
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
          (user.dialogues_aggregate &&
            user.dialogues_aggregate.aggregate &&
            user.dialogues_aggregate.aggregate.count) ||
          0,
      });
    }}
  >
    {({ loading, data, error }) => {
      if (!data || !data.user) {
        if (loading) return <Loading centered />;
        return <AllAwards />;
      }
      if (error) {
        toast.error(error.message);
        return null;
      }
      return <AllAwards userInfo={data.user} />;
    }}
  </Query>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  initAwardCount: (state: typeof awardCheckerReducer.initialState) =>
    dispatch(awardCheckerReducer.actions.initialize(state)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(AllAwardsWithUser);
