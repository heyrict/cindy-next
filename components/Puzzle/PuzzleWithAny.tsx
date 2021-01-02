import React from 'react';
import Link from 'next/link';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/pages/puzzle';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { Box, Flex, Panel } from 'components/General';
import UserInline from 'components/User/UserInline';
import Genre from './Brief/Genre';
import Yami from './Brief/Yami';
import { Title, Hr } from './Brief';
import Status from './Brief/Status';
import Process from './Brief/Process';
import Star from './Brief/Star';
import Comment from './Brief/Comment';
import Bookmark from './Brief/Bookmark';
import Anonymous from './Brief/Anonymous';

import { PuzzleWithAnyProps } from './types';
import { StateType } from 'reducers/types';
import { Status as StatusEnum } from 'generated/globalTypes';

const PuzzleWithAny = ({
  puzzle,
  cap,
  bookmarkCount,
  starCount,
  starSum,
  commentCount,
  dialogueCount,
  dialogueMaxAnsweredtime,
  showGenreImage,
}: PuzzleWithAnyProps) => {
  puzzle.bookmarkCount = bookmarkCount || puzzle.bookmarkCount;
  puzzle.starCount = starCount || puzzle.starCount;
  puzzle.starSum = starSum || puzzle.starSum;
  puzzle.commentCount = commentCount || puzzle.commentCount;
  puzzle.dialogueCount = dialogueCount || puzzle.dialogueCount;
  puzzle.dialogueMaxAnsweredtime = dialogueMaxAnsweredtime || puzzle.dialogueMaxAnsweredtime;

  return (
    <Panel minHeight="8em">
      <Flex
        width={[1 / 4, 1 / 6]}
        borderRadius={2}
        alignItems="center"
        justifyContent="center"
        color="orange.1"
        flexDirection="column"
      >
        {cap}
      </Flex>
      <Box width={[3 / 4, 5 / 6]} px={2}>
        {showGenreImage ? (
          <Flex mb={1} alignItems="center" justifyContent="center">
            <Genre genre={puzzle.genre} />
            <Yami yami={puzzle.yami} />
            <Box width={1}>
              <Link href="/puzzle/[id]" as={`/puzzle/${puzzle.id}`} passHref>
                <Title>{puzzle.title}</Title>
              </Link>
            </Box>
          </Flex>
        ) : (
          <Box mb={1}>
            <Genre genre={puzzle.genre} />
            <Yami yami={puzzle.yami} />
            <Link href="/puzzle/[id]" as={`/puzzle/${puzzle.id}`} passHref>
              <Title>{puzzle.title}</Title>
            </Link>
          </Box>
        )}
        <Box textAlign="right">
          <FormattedMessage {...puzzleMessages.creator} />:{' '}
          <UserInline user={puzzle.user} />
        </Box>
        <Hr />
        <Flex p={1} flexWrap="wrap" alignItems="center">
          {puzzle.status !== StatusEnum.UNDERGOING && puzzle.anonymous && <Anonymous />}
          <Status status={puzzle.status} />
          {typeof puzzle.dialogueCount === 'number' && (
            <Process count={puzzle.dialogueCount} />
          )}
          {typeof puzzle.starCount === 'number' &&
            puzzle.starCount > 0 &&
            typeof puzzle.starSum === 'number' && (
              <Star count={puzzle.starCount} sum={puzzle.starSum} />
            )}
          {typeof puzzle.commentCount === 'number' &&
            puzzle.commentCount > 0 && (
              <Comment puzzleId={puzzle.id} count={puzzle.commentCount} />
            )}
          {typeof puzzle.bookmarkCount === 'number' &&
            puzzle.bookmarkCount > 0 && (
              <Bookmark count={puzzle.bookmarkCount} />
            )}
        </Flex>
      </Box>
    </Panel>
  );
};

const mapStateToProps = (state: StateType) => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleWithAny);
