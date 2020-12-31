import React, { useState } from 'react';
import styled from 'theme/styled';
import Link from 'next/link';
import { text2md } from 'common/markdown';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';
import puzzlePageMessages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';

import { Query } from '@apollo/react-components';
import { PUZZLE_QUERY } from 'graphql/Queries/Puzzles';

import { Img, ButtonTransparent, Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import { Modal, ModalHeader, ModalCloseBtn } from 'components/Modal';
import CommentModalComments from '../Detail/CommentPanel/CommentModalComments';
import UserInline from 'components/User/UserInline';
import C from 'svgs/puzzleBriefComment.svg';

import { CommentProps } from './types';
import {
  PuzzleQuery,
  PuzzleQueryVariables,
} from 'graphql/Queries/generated/PuzzleQuery';
import PuzzleTitle from '../Detail/PuzzleTitle';

export const CommentBase = styled.div`
  text-align: center;
  border-radius: 10px;
  margin-right: 6px;
  margin-bottom: 3px;
  background: ${p => p.theme.colors.cyan[6]};
  display: inline-flex;
  align-items: center;
`;

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Comment = ({ count, puzzleId }: CommentProps) => {
  const [show, setShow] = useState(false);

  return (
    <CommentBase>
      <ButtonTransparent
        padding="1px 6px"
        width={1}
        onClick={() => setShow(true)}
        fontSize="0.9em"
        color="white"
      >
        <Img size="1.25em" pr={1} src={C} />
        {count}
      </ButtonTransparent>
      {show && (
        <Modal show={show} closefn={() => setShow(false)}>
          <ModalHeader>
            <FormattedMessage {...puzzleMessages.comment} />
            <ModalCloseBtn onClick={() => setShow(false)} />
          </ModalHeader>
          <Query<PuzzleQuery, PuzzleQueryVariables>
            variables={{ id: puzzleId }}
            query={PUZZLE_QUERY}
          >
            {({ data, error, loading }) => {
              if (error) {
                toast.error(error.message);
                return null;
              }
              if (!data || !data.puzzle) {
                if (loading) return <Loading centered />;
                return null;
              }
              const puzzle = data.puzzle;
              return (
                <Flex width={1} flexDirection="column">
                  <Box textAlign="center" fontSize="0.8em" width={1}>
                    <PuzzleTitle
                      title={puzzle.title}
                      genre={puzzle.genre}
                      yami={puzzle.yami}
                    />
                  </Box>
                  <Flex width={1}>
                    <Flex
                      flexWrap="wrap"
                      flexGrow={1}
                      mx={3}
                      p={2}
                      border="4px solid"
                      borderColor="orange.8"
                      borderRadius={2}
                      bg="orange.2"
                    >
                      <Box
                        width={1}
                        dangerouslySetInnerHTML={{
                          __html: text2md(puzzle.content),
                        }}
                      />
                      <Box ml="auto">
                        <Box display="inline-box" p={1}>
                          <FormattedMessage {...puzzlePageMessages.creator} />:
                        </Box>
                        <UserInline user={puzzle.user} />
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex flexGrow={1} p={[2, 3]} flexDirection="column">
                    <CommentModalComments puzzleId={puzzleId} />
                  </Flex>
                  <Flex width={1}>
                    <Box width={2 / 3} bg="orange.5">
                      <Link
                        href="/puzzle/[id]"
                        as={`/puzzle/${puzzleId}`}
                        passHref
                      >
                        <ButtonTransparentA py={2} width={1}>
                          <FormattedMessage
                            {...puzzlePageMessages.goToPuzzlePage}
                          />
                        </ButtonTransparentA>
                      </Link>
                    </Box>
                    <Box width={1 / 3} bg="pink.4">
                      <ButtonTransparent
                        py={2}
                        width={1}
                        onClick={() => setShow(false)}
                      >
                        <FormattedMessage {...commonMessages.close} />
                      </ButtonTransparent>
                    </Box>
                  </Flex>
                </Flex>
              );
            }}
          </Query>
        </Modal>
      )}
    </CommentBase>
  );
};

export default Comment;
