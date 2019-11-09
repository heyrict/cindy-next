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
    {({ loading, data, error }) => {
      if (!data || !data.sui_hei_user_by_pk) {
        if (loading) return <Loading centered />;
        return <AllAwards />;
      }
      if (error) {
        toast.error(error.message);
        return null;
      }
      return <AllAwards userInfo={data.sui_hei_user_by_pk} />;
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
