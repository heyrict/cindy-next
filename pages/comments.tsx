import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { mergeList } from 'common/update';

import { FormattedMessage, intlShape, IntlShape } from 'react-intl';
import messages from 'messages/pages/comments';

import { Query } from 'react-apollo';
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
    if (data && data.sui_hei_comment && data.sui_hei_comment.length !== 0) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.sui_hei_comment) return prev;
          return {
            ...prev,
            sui_hei_comment: mergeList(
              prev.sui_hei_comment,
              fetchMoreResult.sui_hei_comment,
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
    (!data || !data.sui_hei_comment || data.sui_hei_comment.length === 0)
  )
    return commentLoadingPanel;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (data && data.sui_hei_comment) {
    return (
      <React.Fragment>
        {data.sui_hei_comment.map(comment => (
          <MultiColBox key={`comment-brief-${comment.id}`}>
            <CommentDisplay comment={comment} />
          </MultiColBox>
        ))}
        {data.sui_hei_comment.length >= COMMENTS_PER_PAGE && hasMore && (
          <LoadMoreVis
            wait={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  offset: data.sui_hei_comment.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult || !fetchMoreResult.sui_hei_comment)
                    return prev;
                  if (
                    fetchMoreResult.sui_hei_comment.length < COMMENTS_PER_PAGE
                  )
                    setHasMore(false);
                  return Object.assign({}, prev, {
                    sui_hei_comment: [
                      ...prev.sui_hei_comment,
                      ...fetchMoreResult.sui_hei_comment,
                    ],
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

const Comments = (_props: any, context: { intl: IntlShape }) => {
  const _: any = context.intl.formatMessage;

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

Comments.contextTypes = {
  intl: intlShape,
};

export default Comments;
