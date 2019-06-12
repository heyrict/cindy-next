import React from 'react';
import styled from '@emotion/styled';
import { Img } from 'components/General';
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
  align-items: center;
`;

export type BookmarkProps = {
  count: number;
};

const Bookmark = ({ count }: BookmarkProps) => (
  <BookmarkBase>
    <Img size="0.8em" pr={1} src={B} />
    {count}
  </BookmarkBase>
);

export default Bookmark;
