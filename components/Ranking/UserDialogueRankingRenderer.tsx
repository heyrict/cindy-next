import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Flex, Box, Panel } from 'components/General';
import Loading from 'components/General/Loading';
import ErrorReload from 'components/General/ErrorReload';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import UserInline from 'components/User/UserInline';

import { FormattedMessage } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import {
  UserDialogueRankingRendererProps,
  UserDialogueRankingRendererDefaultProps,
} from './types';
import {
  UserDialogueRankingQuery,
  UserDialogueRankingQueryVariables,
} from 'graphql/Queries/generated/UserDialogueRankingQuery';
import { USER_DIALOGUE_RANKING_QUERY } from 'graphql/Queries/Ranking';
import { useQuery } from '@apollo/client';
import { getRankingDate, ITEMS_PER_PAGE } from './constants';

const loadingPanel = (
  <Panel minHeight="4em" width={1}>
    <Loading centered />
  </Panel>
);

const UserDialogueRankingRenderer = ({
  shouldLoadMore,
}: UserDialogueRankingRendererProps) => {
  const { year, month } = getRankingDate();
  const { loading, error, data, refetch, fetchMore } = useQuery<
    UserDialogueRankingQuery,
    UserDialogueRankingQueryVariables
  >(USER_DIALOGUE_RANKING_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: 0,
      year,
      month: month + 1,
    },
  });
  const [hasMore, setHasMore] = useState(true);

  if (error) {
    toast.error(error.message);
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (!data || !data.userDialogueRanking) {
    if (loading) return <Loading centered />;
    return null;
  }

  if (data && data.userDialogueRanking) {
    const ranks = data.userDialogueRanking;
    return (
      <React.Fragment>
        {ranks.map((rank, index) => (
          <Panel width={1} minHeight="4em">
            <Flex
              width={[2 / 5, 1 / 4]}
              bg="orange.6"
              borderRadius={2}
              alignItems="center"
              justifyContent="center"
              color="orange.1"
              flexDirection="row"
            >
              <Box fontSize="1.3em" fontWeight="bold">
                <FormattedMessage
                  {...rankingMessages.rank}
                  values={{ rank: index + 1 }}
                />
              </Box>
              <Box fontSize="1.3em" fontWeight="bold" mr={2}>
                :
              </Box>
              <Box fontSize="1.3em" fontWeight="bold">
                {rank.valueCount}
              </Box>
            </Flex>
            <Flex
              width={[3 / 5, 3 / 4]}
              alignItems="center"
              justifyContent="center"
            >
              <Box fontSize="1.3em">
                <UserInline user={rank.user} />
              </Box>
            </Flex>
          </Panel>
        ))}
        {shouldLoadMore && hasMore && (
          <LoadMoreVis
            wait={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  offset: data.userDialogueRanking.length,
                },
              }).then(({ data }) => {
                if (!data || !data.userDialogueRanking) return;
                if (data.userDialogueRanking.length < ITEMS_PER_PAGE)
                  setHasMore(false);
              })
            }
          >
            {loadingPanel}
          </LoadMoreVis>
        )}
      </React.Fragment>
    );
  }
  return null;
};

UserDialogueRankingRenderer.defaultProps = UserDialogueRankingRendererDefaultProps;

export default UserDialogueRankingRenderer;
