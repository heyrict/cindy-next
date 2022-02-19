import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { googleAdInfo } from 'settings';

import { ApolloClient } from '@apollo/client';
import { initializeApollo } from 'lib/apollo';
import {
  PUZZLE_JUMP_BUTTONS_QUERY,
  PUZZLE_QUERY,
  PUZZLE_SOLUTION_QUERY,
} from 'graphql/Queries/Puzzles';
import { PUZZLE_PAGE_TAGS_QUERY } from 'graphql/Queries/Tag';

import { useIntl } from 'react-intl';
import messages from 'messages/pages/puzzle';

import PuzzleRenderer from 'components/Puzzle/PuzzleRenderer';
import GoogleAd from 'components/GoogleAd';

import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';
import {
  PuzzleSolutionQuery,
  PuzzleSolutionQueryVariables,
} from 'graphql/Queries/generated/PuzzleSolutionQuery';
import { Status } from 'generated/globalTypes';
import {
  PuzzleJumpButtonsQuery,
  PuzzleJumpButtonsQueryVariables,
} from 'graphql/Queries/generated/PuzzleJumpButtonsQuery';
import {
  PuzzlePageTagsQuery,
  PuzzlePageTagsQueryVariables,
} from 'graphql/Queries/generated/PuzzlePageTagsQuery';

const PuzzlePage = () => {
  const { formatMessage: _ } = useIntl();
  const router = useRouter();
  const { id } = router.query;

  const puzzleId = parseInt(id as string, 10);

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      {isNaN(puzzleId) ? null : (
        <PuzzleRenderer puzzleId={puzzleId} formatMessage={_} />
      )}
      <GoogleAd {...googleAdInfo.inarticleAd} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const serverSideContext = {
    route: ctx.resolvedUrl,
    cookie: ctx.req.headers.cookie || null,
  };

  const apolloClient: ApolloClient<object> = initializeApollo();
  let { id } = ctx.query;
  const puzzleId = parseInt(id as string, 10);

  if (!isNaN(puzzleId)) {
    let [{ data }] = await Promise.all([
      apolloClient.query<PuzzleQuery, PuzzleQueryVariables>({
        query: PUZZLE_QUERY,
        variables: { id: puzzleId },
      }),
      apolloClient.query<
        PuzzleJumpButtonsQuery,
        PuzzleJumpButtonsQueryVariables
      >({
        query: PUZZLE_JUMP_BUTTONS_QUERY,
        variables: { puzzleId },
      }),
      apolloClient.query<PuzzlePageTagsQuery, PuzzlePageTagsQueryVariables>({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
      }),
    ]);

    if (
      data.puzzle.status === Status.SOLVED ||
      data.puzzle.status === Status.DAZED
    ) {
      await apolloClient.query<
        PuzzleSolutionQuery,
        PuzzleSolutionQueryVariables
      >({
        query: PUZZLE_SOLUTION_QUERY,
        variables: {
          id: puzzleId,
        },
      });
    }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      serverSideContext,
    },
  };
};

export default PuzzlePage;
