import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { mergeList } from 'common/update';

import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'messages/pages/comments';

import { useQuery } from '@apollo/client';
import { COMMENTS_QUERY } from 'graphql/Queries/Comment';

import { Heading, Flex, Panel } from 'components/General';
import Loading from 'components/General/Loading';
import MultiColBox from 'components/General/MultiColBox';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import PuzzleSubbar from 'components/Subbar/Puzzle';
import CommentDisplay from 'components/Puzzle/CommentDisplay';

import {
  CommentsQuery,
  CommentsQueryVariables,
} from 'graphql/Queries/generated/CommentsQuery';
import { CommentsRendererProps } from 'pageTypes';
import { GetStaticProps } from 'next';

const COMMENTS_PER_PAGE = 20;
const commentLoadingPanel = (
  <MultiColBox>
    <Panel>
      <Loading centered />
    </Panel>
  </MultiColBox>
);

const CommentsRenderer = ({ variables }: CommentsRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore } = useQuery<
    CommentsQuery,
    CommentsQueryVariables
  >(COMMENTS_QUERY, {
    variables,
  });

  // Update first 20 questions upon second+ load
  useEffect(() => {
    if (
      data &&
      data.commentsInSolvedPuzzle &&
      data.commentsInSolvedPuzzle.length !== 0
    ) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.commentsInSolvedPuzzle)
            return prev;
          return {
            ...prev,
            comments: mergeList(
              prev.commentsInSolvedPuzzle,
              fetchMoreResult.commentsInSolvedPuzzle,
              'id',
              'desc',
            ),
          };
        },
      });
    }
  }, []);

  if (
    loading &&
    (!data ||
      !data.commentsInSolvedPuzzle ||
      data.commentsInSolvedPuzzle.length === 0)
  )
    return commentLoadingPanel;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (data && data.commentsInSolvedPuzzle) {
    return (
      <React.Fragment>
        {data.commentsInSolvedPuzzle.map(comment => (
          <MultiColBox key={`comment-brief-${comment.id}`}>
            <CommentDisplay comment={comment} />
          </MultiColBox>
        ))}
        {data.commentsInSolvedPuzzle.length >= COMMENTS_PER_PAGE && hasMore && (
          <LoadMoreVis
            wait={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  offset: data.commentsInSolvedPuzzle.length,
                },
              }).then(({ data }) => {
                if (data.commentsInSolvedPuzzle.length < COMMENTS_PER_PAGE)
                  setHasMore(false);
              })
            }
          >
            {commentLoadingPanel}
          </LoadMoreVis>
        )}
      </React.Fragment>
    );
  }
  return null;
};

const Comments = () => {
  const { formatMessage: _ } = useIntl();

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <PuzzleSubbar />
      <Flex flexWrap="wrap">
        <CommentsRenderer variables={{ limit: COMMENTS_PER_PAGE, offset: 0 }} />
      </Flex>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    serverSideContext: {
      route: '/comments',
    },
  },
});

export default Comments;
