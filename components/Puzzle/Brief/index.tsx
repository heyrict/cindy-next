import React from 'react';
import styled from 'theme/styled';
import Link from 'next/link';
import { Box, Flex } from 'components/General';

import UserCol from 'components/User/UserCol';
import { AnonymousUserCol } from 'components/User/Anonymous';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { FormattedMessage, FormattedTime, FormattedRelative } from 'react-intl';
import messages from 'messages/components/puzzle';

import Anonymous from './Anonymous';
import Bookmark from './Bookmark';
import Comment from './Comment';
import Genre from './Genre';
import Process from './Process';
import Star from './Star';
import Status from './Status';
import Yami from './Yami';
import NewQuestion from './NewQuestion';
import PuzzlePane from './PuzzlePane';

import { PuzzleBriefProps } from './types';
import { StateType } from 'reducers/types';

export const Hr = styled.hr`
  color: ${p => p.theme.colors.gray[6]};
`;

export const Time = styled(Box)`
  text-align: right;
  font-size: 0.9em;
  color: ${p => p.theme.colors.gray[7]};
`;

export const Title = styled.a`
  font-size: 1.1em;
  font-weight: bold;
  color: ${p => p.theme.colors.red[9]};
  &:hover,
  &:active {
    color: ${p => p.theme.colors.red[8]};
  }
`;

export const Brief = ({
  puzzle,
  bookmarkCount,
  starCount,
  starSum,
  commentCount,
  dialogueCount,
  dialogueMaxAnsweredtime,
  dialogueMaxCreated,
  showGenreImage,
}: PuzzleBriefProps) => {
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

  const shouldShowNewQuestion =
    (aggregates.dialogueMaxCreatedtime &&
      !aggregates.dialogueMaxAnsweredtime) ||
    (aggregates.dialogueMaxCreatedtime &&
      aggregates.dialogueMaxAnsweredtime &&
      aggregates.dialogueMaxCreatedtime > aggregates.dialogueMaxAnsweredtime);

  return (
    <PuzzlePane
      status={puzzle.status}
      alignItems="center"
      justifyContent="center"
    >
      {puzzle.status === 0 && puzzle.anonymous ? (
        <AnonymousUserCol width={[1 / 4, 1 / 6]} />
      ) : (
        <UserCol width={[1 / 4, 1 / 6]} user={puzzle.sui_hei_user} />
      )}
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
        {aggregates.dialogueMaxAnsweredtime && (
          <Time width={1}>
            <FormattedMessage {...messages.lastupdate} />:{' '}
            <FormattedRelative value={aggregates.dialogueMaxAnsweredtime} />
          </Time>
        )}
        {puzzle.created && (
          <Time width={1}>
            <FormattedMessage {...messages.createdAt} />:{' '}
            <FormattedTime
              value={puzzle.created}
              year="numeric"
              month="short"
              day="numeric"
            />
          </Time>
        )}
        {puzzle.status !== 0 && puzzle.modified && (
          <Time width={1}>
            <FormattedMessage {...messages.solvedAt} />:{' '}
            <FormattedTime
              value={puzzle.modified}
              year="numeric"
              month="short"
              day="numeric"
            />
          </Time>
        )}
        <Hr />
        <Flex p={1} flexWrap="wrap" alignItems="center">
          {puzzle.status !== 0 && puzzle.anonymous && <Anonymous />}
          <Status status={puzzle.status} />
          {shouldShowNewQuestion && <NewQuestion />}
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
              <Comment count={aggregates.commentCount} />
            )}
          {typeof aggregates.bookmarkCount === 'number' &&
            aggregates.bookmarkCount > 0 && (
              <Bookmark count={aggregates.bookmarkCount} />
            )}
        </Flex>
      </Box>
    </PuzzlePane>
  );
};

const mapStateToProps = (state: StateType) => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Brief);
