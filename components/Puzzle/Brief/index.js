import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Flex, Panel } from 'components/General';

import { PTUserInlineUser } from 'components/User/PropTypes';
import UserCol from 'components/User/UserCol';
import { AnonymousUserCol } from 'components/User/Anonymous';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { FormattedMessage, FormattedTime, FormattedRelative } from 'react-intl';
import messages from 'messages/components/puzzle';

import Genre from './Genre';
import Yami from './Yami';
import Status from './Status';
import Process from './Process';
import Star from './Star';
import Comment from './Comment';

const Hr = styled.hr`
  color: ${p => p.theme.colors.gray[6]};
`;

const Time = styled(Box)`
  text-align: right;
  font-size: 0.9em;
  color: ${p => p.theme.colors.gray[7]};
`;

const Brief = ({ puzzle, dialogue, showGenreImage }) => {
  const dialogueAggregation =
    puzzle.sui_hei_dialogues_aggregate &&
    puzzle.sui_hei_dialogues_aggregate.aggregate;
  const processDialogue =
    dialogue ||
    (dialogueAggregation && {
      count: dialogueAggregation.count,
      maxAnsweredtime:
        dialogueAggregation.max &&
        (dialogueAggregation.max.answeredtime || puzzle.created),
    });

  return (
    <Panel alignItems="center" justifyContent="center">
      {puzzle.anonymous ? (
        <AnonymousUserCol width={[1 / 4, 1 / 6]} />
      ) : (
        <UserCol width={[1 / 4, 1 / 6]} user={puzzle.sui_hei_user} />
      )}
      <Box width={[3 / 4, 5 / 6]} px={2}>
        {showGenreImage ? (
          <Flex mb={1} alignItems="center" justifyContent="center">
            <Genre genre={puzzle.genre} />
            <Yami yami={puzzle.yami} />
            <Box width={1}>{puzzle.title}</Box>
          </Flex>
        ) : (
          <Box mb={1}>
            <Genre genre={puzzle.genre} />
            <Yami yami={puzzle.yami} />
            {puzzle.title}
          </Box>
        )}
        {processDialogue && processDialogue.maxAnsweredtime && (
          <Time width={1}>
            <FormattedMessage {...messages.lastupdate} />:{' '}
            <FormattedRelative value={processDialogue.maxAnsweredtime} />
          </Time>
        )}
        <Time width={1}>
          <FormattedMessage {...messages.createdAt} />:{' '}
          <FormattedTime
            value={puzzle.created}
            year="numeric"
            month="short"
            day="numeric"
          />
        </Time>
        {puzzle.status !== 0 && (
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
        <Flex p={1} flexWrap="wrap">
          <Status status={puzzle.status} />
          {processDialogue && <Process count={processDialogue.count} />}
          {puzzle.sui_hei_stars_aggregate &&
            puzzle.sui_hei_stars_aggregate.aggregate.count > 0 && (
              <Star
                count={puzzle.sui_hei_stars_aggregate.aggregate.count}
                sum={puzzle.sui_hei_stars_aggregate.aggregate.sum.value}
              />
            )}
          {puzzle.sui_hei_comments_aggregate &&
            puzzle.sui_hei_comments_aggregate.aggregate.count > 0 && (
              <Comment
                count={puzzle.sui_hei_comments_aggregate.aggregate.count}
              />
            )}
          {puzzle.sui_hei_bookmarks_aggregate &&
            puzzle.sui_hei_bookmarks_aggregate.count > 0 && (
              <Bookmark
                count={puzzle.sui_hei_bookmarks_aggregate.aggregate.count}
              />
            )}
        </Flex>
      </Box>
    </Panel>
  );
};

Brief.propTypes = {
  puzzle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    genre: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    yami: PropTypes.number.isRequired,
    anonymous: PropTypes.bool,
    created: PropTypes.string,
    dazed_on: PropTypes.string,
    sui_hei_user: PTUserInlineUser,
    sui_hei_stars_aggregate: PropTypes.shape({
      aggregate: PropTypes.shape({
        count: PropTypes.number.isRequired,
        sum: PropTypes.shape({
          value: PropTypes.number,
        }).isRequired,
      }).isRequired,
    }),
    sui_hei_comments_aggregate: PropTypes.shape({
      aggregate: PropTypes.shape({
        count: PropTypes.number.isRequired,
      }).isRequired,
    }),
    sui_hei_bookmarks_aggregate: PropTypes.shape({
      aggregate: PropTypes.shape({
        count: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }).isRequired,
  bookmarkCount: PropTypes.number,
  commentCount: PropTypes.number,
  starCount: PropTypes.number,
  starSum: PropTypes.number,
  showGenreImage: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Brief);
