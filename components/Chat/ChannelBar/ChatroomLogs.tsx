import React from 'react';

import { Flex } from 'components/General';
import Loading from 'components/General/Loading';
import Chatmessage from '../Chatmessage';

import { Query } from '@apollo/react-components';
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
  <Flex flexDirection="column" bg="orange.1" py={2} width={1}>
    <PaginatedQuery<ChatroomLogsQuery, ChatroomLogsQueryVariables>
      query={CHATROOM_LOGS_QUERY}
      variables={{ chatroomId }}
      getItemCount={data => data.chatmessageCount}
      renderItems={data => {
        const { chatmessages } = data;
        if (!chatmessages) return null;
        return relatedPuzzleId ? (
          <Query<ChatroomPuzzle, ChatroomPuzzleVariables>
            query={CHATROOM_PUZZLE_QUERY}
            variables={{
              puzzleId: relatedPuzzleId,
            }}
          >
            {({ loading, data, error }) => {
              if (error) return <div>Error</div>;
              if (!data || !data.puzzle) {
                if (loading) return <Loading centered />;
                return null;
              }

              const { puzzle: relatedPuzzle } = data;
              if (relatedPuzzle.anonymous) {
                return (
                  <>
                    {chatmessages.map(cm => (
                      <Chatmessage
                        key={`chatmessage-${cm.id}`}
                        chatmessage={cm}
                        anonymous={relatedPuzzle.user.id === cm.user.id}
                      />
                    ))}
                  </>
                );
              }
              return (
                <>
                  {chatmessages.map(cm => (
                    <Chatmessage
                      key={`chatmessage-${cm.id}`}
                      chatmessage={cm}
                    />
                  ))}
                </>
              );
            }}
          </Query>
        ) : (
          <>
            {chatmessages.map(cm => (
              <Chatmessage key={`chatmessage-${cm.id}`} chatmessage={cm} />
            ))}
          </>
        );
      }}
    />
  </Flex>
);

export default ChatroomLogs;
