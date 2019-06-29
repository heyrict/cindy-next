import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Flex, Box, Panel } from 'components/General';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import UserInline from 'components/User/UserInline';

import { FormattedMessage } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';

import {
  UserPuzzleRankingRendererProps,
  UserPuzzleRankingRendererDefaultProps,
} from './types';

const loadingPanel = (
  <Panel minHeight="4em" width={1}>
    Loading...
  </Panel>
);

const UserPuzzleRankingRenderer = ({
  loading,
  error,
  data,
  fetchMore,
  shouldLoadMore,
}: UserPuzzleRankingRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (loading && (!data || !data.puzzle_count_ranking))
    return <span>'Loading...'</span>;

  if (data && data.puzzle_count_ranking) {
    const ranks = data.puzzle_count_ranking;
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
                {rank.value}
              </Box>
            </Flex>
            <Flex
              width={[3 / 5, 3 / 4]}
              alignItems="center"
              justifyContent="center"
            >
              <Box fontSize="1.3em">
                <UserInline user={rank.sui_hei_user} />
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
                  offset: data.puzzle_count_ranking.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult || !fetchMoreResult.puzzle_count_ranking)
                    return prev;
                  if (fetchMoreResult.puzzle_count_ranking.length === 0)
                    setHasMore(false);
                  return Object.assign({}, prev, {
                    puzzle_count_ranking: [
                      ...prev.puzzle_count_ranking,
                      ...fetchMoreResult.puzzle_count_ranking,
                    ],
                  });
                },
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

UserPuzzleRankingRenderer.defaultProps = UserPuzzleRankingRendererDefaultProps;

export default UserPuzzleRankingRenderer;
