import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { mergeList } from 'common/update';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import messages from 'messages/pages/comments';

import { Query } from '@apollo/react-components';
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

const COMMENTS_PER_PAGE = 20;
const commentLoadingPanel = (
  <MultiColBox>
    <Panel>
      <Loading centered />
    </Panel>
  </MultiColBox>
);

const CommentsRenderer = ({
  loading,
  error,
  data,
  fetchMore,
}: CommentsRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  // Update first 20 questions upon second+ load
  useEffect(() => {
    if (data && data.comment && data.comment.length !== 0) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.comment) return prev;
          return {
            ...prev,
            comment: mergeList(
              prev.comment,
              fetchMoreResult.comment,
              'id',
              'desc',
            ),
          };
        },
      });
    }
  }, []);

  if (loading && (!data || !data.comment || data.comment.length === 0))
    return commentLoadingPanel;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (data && data.comment) {
    return (
      <React.Fragment>
        {data.comment.map(comment => (
          <MultiColBox key={`comment-brief-${comment.id}`}>
            <CommentDisplay comment={comment} />
          </MultiColBox>
        ))}
        {data.comment.length >= COMMENTS_PER_PAGE && hasMore && (
          <LoadMoreVis
            wait={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  offset: data.comment.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult || !fetchMoreResult.comment) return prev;
                  if (fetchMoreResult.comment.length < COMMENTS_PER_PAGE)
                    setHasMore(false);
                  return Object.assign({}, prev, {
                    comment: [...prev.comment, ...fetchMoreResult.comment],
                  });
                },
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

const Comments = ({ intl }: { intl: IntlShape }) => {
  const _ = intl.formatMessage;

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
        <Query<CommentsQuery, CommentsQueryVariables>
          query={COMMENTS_QUERY}
          variables={{ limit: COMMENTS_PER_PAGE }}
          fetchPolicy="cache-first"
        >
          {params => <CommentsRenderer {...params} />}
        </Query>
      </Flex>
    </React.Fragment>
  );
};

export default injectIntl(Comments);
