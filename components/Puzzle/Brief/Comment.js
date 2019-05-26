import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage, FormattedRelative } from 'react-intl';

const CommentBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.usuki};
  background: ${p => p.theme.colors.konjyo};
`;

const Comment = ({ count, sum }) => <CommentBase>% {count}</CommentBase>;

Comment.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
};

export default Comment;
