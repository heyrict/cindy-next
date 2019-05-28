import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage, FormattedRelative } from 'react-intl';

const BookmarkBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.lime[6]};
`;

const Bookmark = ({ count }) => <BookmarkBase>B{count}</BookmarkBase>;

Bookmark.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Bookmark;
