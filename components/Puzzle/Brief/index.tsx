import React from 'react';
import styled from 'theme/styled';
import Link from 'next/link';
import { Box, Flex } from 'components/General';

import UserCol from 'components/User/UserCol';
import { AnonymousUserCol } from 'components/User/Anonymous';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { FormattedMessage, FormattedTime } from 'react-intl';
import messages from 'messages/components/puzzle';

import Anonymous from './Anonymous';
import Bookmark from './Bookmark';
import Comment from './Comment';
import Genre from './Genre';
import Process from './Process';
import Star from './Star';
import Status from './Status';
import Yami from './Yami';
import PuzzlePane from './PuzzlePane';

import { PuzzleBriefProps } from './types';
import { StateType } from 'reducers/types';
import { Status as StatusEnum } from 'generated/globalTypes';

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

export const PuzzleBrief = ({
  puzzle,
  bookmarkCount,
  starCount,
  starSum,
  commentCount,
  dialogueCount,
  dialogueNewCount,
  showGenreImage,
}: PuzzleBriefProps) => {
  puzzle.bookmarkCount = bookmarkCount || puzzle.bookmarkCount;
  puzzle.commentCount = commentCount || puzzle.commentCount;
  puzzle.starCount = starCount || puzzle.starCount;
  puzzle.starSum = starSum || puzzle.starSum;
  puzzle.dialogueCount = dialogueCount || puzzle.dialogueCount;
  puzzle.dialogueNewCount = dialogueNewCount || puzzle.dialogueNewCount;

  return (
    <PuzzlePane
      status={puzzle.status}
      alignItems="center"
      justifyContent="center"
    >
      {puzzle.status === StatusEnum.UNDERGOING && puzzle.anonymous ? (
        <AnonymousUserCol width={[1 / 4, 1 / 6]} />
      ) : (
        <UserCol width={[1 / 4, 1 / 6]} user={puzzle.user} />
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
        {puzzle.status !== StatusEnum.UNDERGOING && puzzle.modified && (
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
          {puzzle.status !== StatusEnum.UNDERGOING && puzzle.anonymous && (
            <Anonymous />
          )}
          <Status status={puzzle.status} />
          {typeof puzzle.dialogueCount === 'number' && (
            <Process
              count={puzzle.dialogueCount}
              newCount={puzzle.dialogueNewCount}
            />
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
    </PuzzlePane>
  );
};

const mapStateToProps = (state: StateType) => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleBrief);
