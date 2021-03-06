import React from 'react';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import {
  PROFILE_COMMENTS_QUERY,
  PROFILE_COMMENTS_RECEIVED_QUERY,
} from 'graphql/Queries/Comment';

import { FormattedMessage } from 'react-intl';
import userPageMessages from 'messages/pages/user';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import Heading from 'components/General/Heading';
import CommentDisplay from 'components/Puzzle/CommentDisplay';

import { ProfileCommentsTabProps } from './types';
import {
  ProfileCommentsQuery,
  ProfileCommentsQueryVariables,
} from 'graphql/Queries/generated/ProfileCommentsQuery';
import {
  ProfileCommentsReceivedQuery,
  ProfileCommentsReceivedQueryVariables,
} from 'graphql/Queries/generated/ProfileCommentsReceivedQuery';

const ProfileCommentsTab = ({ userId }: ProfileCommentsTabProps) => (
  <Flex flexWrap="wrap" alignItems="baseline" justifyContent="center">
    <Flex flexWrap="wrap" width={[1, 1 / 2, 1, 1 / 2]}>
      <Heading fontSize={4}>
        <FormattedMessage {...userPageMessages.comments_posted} />
      </Heading>
      <PaginatedQuery<ProfileCommentsQuery, ProfileCommentsQueryVariables>
        query={PROFILE_COMMENTS_QUERY}
        variables={{
          userId,
        }}
        getItemCount={data => data.commentCount}
        renderItems={data => {
          if (!data.comments) return null;
          return (
            <>
              {data.comments.map(comment => (
                <Box key={comment.id} width={1}>
                  <CommentDisplay comment={comment} />
                </Box>
              ))}
            </>
          );
        }}
      />
    </Flex>
    <Flex flexWrap="wrap" width={[1, 1 / 2, 1, 1 / 2]}>
      <Heading fontSize={4}>
        <FormattedMessage {...userPageMessages.comments_received} />
      </Heading>
      <PaginatedQuery<
        ProfileCommentsReceivedQuery,
        ProfileCommentsReceivedQueryVariables
      >
        query={PROFILE_COMMENTS_RECEIVED_QUERY}
        variables={{
          userId,
        }}
        getItemCount={data => data.userReceivedCommentCount}
        renderItems={data => {
          if (!data.userReceivedComments) return null;
          return (
            <>
              {data.userReceivedComments.map(comment => (
                <Box key={comment.id} width={1}>
                  <CommentDisplay comment={comment} />
                </Box>
              ))}
            </>
          );
        }}
      />
    </Flex>
  </Flex>
);

export default ProfileCommentsTab;
