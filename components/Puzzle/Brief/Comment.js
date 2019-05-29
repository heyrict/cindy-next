import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Img } from 'components/General';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import C from 'svgs/puzzleBriefComment.svg';

const CommentBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.cyan[6]};
  display: inline-flex;
`;

const Comment = ({ count }) => (
  <CommentBase>
    <Img size="1.25em" pr={1} src={C} />
    {count}
  </CommentBase>
);

Comment.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Comment;
