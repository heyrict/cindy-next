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

const PuzzleWithAny = ({
  puzzle,
  cap,
  bookmarkCount,
  starCount,
  starSum,
  commentCount,
  dialogueCount,
  dialogueMaxAnsweredtime,
  dialogueMaxCreated,
  showGenreImage,
}: PuzzleWithAnyProps) => {
  const aggregates = {
    bookmarkCount:
      bookmarkCount ||
      (puzzle.sui_hei_bookmarks_aggregate &&
        puzzle.sui_hei_bookmarks_aggregate.aggregate &&
        puzzle.sui_hei_bookmarks_aggregate.aggregate.count),
    commentCount:
      commentCount ||
      (puzzle.sui_hei_comments_aggregate &&
        puzzle.sui_hei_comments_aggregate.aggregate &&
        puzzle.sui_hei_comments_aggregate.aggregate.count),
    starCount:
      starCount ||
      (puzzle.sui_hei_stars_aggregate &&
        puzzle.sui_hei_stars_aggregate.aggregate &&
        puzzle.sui_hei_stars_aggregate.aggregate.count),
    starSum:
      starSum ||
      (puzzle.sui_hei_stars_aggregate &&
        puzzle.sui_hei_stars_aggregate.aggregate &&
        puzzle.sui_hei_stars_aggregate.aggregate.sum &&
        puzzle.sui_hei_stars_aggregate.aggregate.sum.value),
    dialogueCount:
      dialogueCount ||
      (puzzle.sui_hei_dialogues_aggregate &&
        puzzle.sui_hei_dialogues_aggregate.aggregate &&
        puzzle.sui_hei_dialogues_aggregate.aggregate.count),
    dialogueMaxAnsweredtime:
      dialogueMaxAnsweredtime ||
      (puzzle.sui_hei_dialogues_aggregate &&
        puzzle.sui_hei_dialogues_aggregate.aggregate &&
        puzzle.sui_hei_dialogues_aggregate.aggregate.max &&
        puzzle.sui_hei_dialogues_aggregate.aggregate.max.answeredtime),
    dialogueMaxCreatedtime:
      dialogueMaxCreated ||
      (puzzle.sui_hei_dialogues_aggregate &&
        puzzle.sui_hei_dialogues_aggregate.aggregate &&
        puzzle.sui_hei_dialogues_aggregate.aggregate.max &&
        puzzle.sui_hei_dialogues_aggregate.aggregate.max.created),
  };

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
          <UserInline user={puzzle.sui_hei_user} />
        </Box>
        <Hr />
        <Flex p={1} flexWrap="wrap" alignItems="center">
          {puzzle.status !== 0 && puzzle.anonymous && <Anonymous />}
          <Status status={puzzle.status} />
          {typeof aggregates.dialogueCount === 'number' && (
            <Process count={aggregates.dialogueCount} />
          )}
          {typeof aggregates.starCount === 'number' &&
            aggregates.starCount > 0 &&
            typeof aggregates.starSum === 'number' && (
              <Star count={aggregates.starCount} sum={aggregates.starSum} />
            )}
          {typeof aggregates.commentCount === 'number' &&
            aggregates.commentCount > 0 && (
              <Comment puzzleId={puzzle.id} count={aggregates.commentCount} />
            )}
          {typeof aggregates.bookmarkCount === 'number' &&
            aggregates.bookmarkCount > 0 && (
              <Bookmark count={aggregates.bookmarkCount} />
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
