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
  UserPuzzleRankingRendererProps,
  UserPuzzleRankingRendererDefaultProps,
} from './types';
import { useQuery } from '@apollo/client';
import {
  UserPuzzleRankingQuery,
  UserPuzzleRankingQueryVariables,
} from 'graphql/Queries/generated/UserPuzzleRankingQuery';
import { USER_PUZZLE_RANKING_QUERY } from 'graphql/Queries/Ranking';
import { getRankingDate, ITEMS_PER_PAGE } from './constants';

const loadingPanel = (
  <Panel minHeight="4em" width={1}>
    <Loading centered />
  </Panel>
);

const UserPuzzleRankingRenderer = ({
  shouldLoadMore,
}: UserPuzzleRankingRendererProps) => {
  const { year, month } = getRankingDate();
  const { loading, error, data, refetch, fetchMore } = useQuery<
    UserPuzzleRankingQuery,
    UserPuzzleRankingQueryVariables
  >(USER_PUZZLE_RANKING_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: 0,
      year,
      month,
    },
  });
  const [hasMore, setHasMore] = useState(true);

  if (error) {
    toast.error(error.message);
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (!data || !data.userPuzzleRanking) {
    if (loading) return <Loading centered />;
    return null;
  }

  const ranks = data.userPuzzleRanking;
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
                offset: data.userPuzzleRanking.length,
              },
            }).then(({ data }) => {
              if (!data || !data.userPuzzleRanking) return;
              if (data.userPuzzleRanking.length < ITEMS_PER_PAGE)
                setHasMore(false);
            })
          }
        >
          {loadingPanel}
        </LoadMoreVis>
      )}
    </React.Fragment>
  );
};

UserPuzzleRankingRenderer.defaultProps = UserPuzzleRankingRendererDefaultProps;

export default UserPuzzleRankingRenderer;
