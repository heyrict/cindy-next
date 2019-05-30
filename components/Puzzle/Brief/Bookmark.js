import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Img } from 'components/General';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import B from 'svgs/puzzleBriefBookmark.svg';

export const BookmarkBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.lime[6]};
  display: inline-flex;
`;

const Bookmark = ({ count }) => (
  <BookmarkBase>
    <Img size="0.8em" pr={1} src={B} />
    {count}
  </BookmarkBase>
);

Bookmark.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Bookmark;
