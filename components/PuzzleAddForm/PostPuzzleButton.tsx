import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';

import { connect } from 'react-redux';
import * as awardCheckerReducer from 'reducers/awardChecker';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/add_puzzle';

import { ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';

import { ApolloError } from '@apollo/client';
import { ActionContentType } from 'reducers/types';
import { PostPuzzleDetailProps } from './types';

const PostPuzzleButton = ({
  onSubmit,
  incPuzzles,
  getData,
}: PostPuzzleDetailProps) => {
  const [submitting, setSubmitting] = useState(false);
  return submitting ? (
    <Loading centered />
  ) : (
    <ButtonTransparent
      py={2}
      width={1}
      color="orange.1"
      onClick={() => {
        const data = getData();
        if (data) {
          setSubmitting(true);
          onSubmit(data)
            .then(returns => {
              if (!returns) return;
              if ('validationErrors' in returns) {
                returns.validationErrors.forEach(error => {
                  toast.error(error);
                });
                setSubmitting(false);
                return;
              }
              const { data, error } = returns;
              if (error) {
                toast.error(error.message);
                setSubmitting(false);
                return;
              }
              if (
                !data ||
                !data.insert_puzzle ||
                !data.insert_puzzle.returning
              ) {
                toast.error('Error: no data returns');
                setSubmitting(false);
                return;
              }
              incPuzzles();
              const addedPuzzle = data.insert_puzzle.returning[0];
              Router.push('/puzzle/[id]', `/puzzle/${addedPuzzle.id}`);
            })
            .catch((error: ApolloError) => {
              toast.error(error.message);
              setSubmitting(false);
            });
        }
      }}
    >
      <FormattedMessage {...messages.publishPuzzle} />
    </ButtonTransparent>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  incPuzzles: () => dispatch(awardCheckerReducer.actions.puzzles.inc()),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(PostPuzzleButton);
