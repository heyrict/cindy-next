import React from 'react';

import { Flex } from 'components/General';
import Chatmessage from '../Chatmessage';

import { Query } from 'react-apollo';
import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import {
  CHATROOM_LOGS_QUERY,
  CHATROOM_PUZZLE_QUERY,
} from 'graphql/Queries/Chat';

import {
  ChatroomLogsQuery,
  ChatroomLogsQueryVariables,
} from 'graphql/Queries/generated/ChatroomLogsQuery';
import {
  ChatroomPuzzle,
  ChatroomPuzzleVariables,
} from 'graphql/Queries/generated/ChatroomPuzzle';
import { ChatroomLogsProps } from './types';

const ChatroomLogs = ({ chatroomId, relatedPuzzleId }: ChatroomLogsProps) => (
  <Flex flexDirection="column" bg="orange.1" py={2} mt={4} width={1}>
    <PaginatedQuery<ChatroomLogsQuery, ChatroomLogsQueryVariables>
      query={CHATROOM_LOGS_QUERY}
      variables={{ chatroomId }}
      getItemCount={data => {
        const itemCount =
          data.sui_hei_chatmessage_aggregate.aggregate &&
          data.sui_hei_chatmessage_aggregate.aggregate.count;
        return itemCount || 0;
      }}
      renderItems={data => {
        const chatmessages = data.sui_hei_chatmessage;
        if (!chatmessages) return null;
        return relatedPuzzleId ? (
          <Query<ChatroomPuzzle, ChatroomPuzzleVariables>
            query={CHATROOM_PUZZLE_QUERY}
            variables={{
              puzzleId: relatedPuzzleId,
            }}
          >
            {res => {
              if (res.loading) return <div>Loading...</div>;
              if (res.error) return <div>Error</div>;
              if (!res.data || !res) return <div>No messages</div>;

              const { sui_hei_puzzle_by_pk: relatedPuzzle } = res.data;
              if (relatedPuzzle === null) return null;
              if (relatedPuzzle.anonymous) {
                return chatmessages.map(cm => (
                  <Chatmessage
                    key={`chatmessage-${cm.id}`}
                    chatmessage={cm}
                    anonymous={
                      relatedPuzzle.sui_hei_user.id === cm.sui_hei_user.id
                    }
                  />
                ));
              }
              return chatmessages.map(cm => (
                <Chatmessage key={`chatmessage-${cm.id}`} chatmessage={cm} />
              ));
            }}
          </Query>
        ) : (
          chatmessages.map(cm => (
            <Chatmessage key={`chatmessage-${cm.id}`} chatmessage={cm} />
          ))
        );
      }}
    />
  </Flex>
);

export default ChatroomLogs;