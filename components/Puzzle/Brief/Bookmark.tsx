import React from 'react';
import styled from 'theme/styled';
import { Img } from 'components/General';
import B from 'svgs/puzzleBriefBookmark.svg';

export const BookmarkBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.preset.puzzle.bookmark.fg};
  background: ${p => p.theme.colors.preset.puzzle.bookmark.bg};
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
