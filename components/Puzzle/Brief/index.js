import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Flex, Panel } from 'components/General';

import { PTUserInlineUser } from 'components/User/PropTypes';
import UserCol from 'components/User/UserCol';
import { AnonymousUserCol } from 'components/User/Anonymous';

import Genre from './Genre';

const Hr = styled.hr`
  color: ${p => p.theme.colors.sakuranezumi};
`;

const Brief = ({ puzzle }) => {
  return (
    <div>
      <Panel>
        <Flex alignItems="center">
          {puzzle.anonymous ? (
            <AnonymousUserCol width={[1 / 4, 1 / 6]} />
          ) : (
            <UserCol width={[1 / 4, 1 / 6]} user={puzzle.sui_hei_user} />
          )}
          <Box width={[3 / 4, 5 / 6]} px={2}>
            <Box p={1}>
              <Genre genre={puzzle.genre} />
              {puzzle.title}
            </Box>
            <Hr />
            <Box p={1}>
              {puzzle.status}
            </Box>
          </Box>
        </Flex>
      </Panel>
    </div>
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
  }).isRequired,
  dialogue: PropTypes.shape({
    dialogueCount: PropTypes.number.isRequired,
    dialogueUnansweredCount: PropTypes.number.isRequired,
  }),
  bookmarkCount: PropTypes.number,
  commentCount: PropTypes.number,
  starCount: PropTypes.number,
  starSum: PropTypes.number,
};

export default Brief;
