import React from 'react';
import PropTypes from 'prop-types';
import styled from 'theme/styled';
import { Img } from 'components/General';
import C from 'svgs/puzzleBriefComment.svg';

export const CommentBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.cyan[6]};
  display: inline-flex;
  align-items: center;
`;

export type CommentProps = {
  count: number;
}

const Comment = ({ count }: CommentProps) => (
  <CommentBase>
    <Img size="1.25em" pr={1} src={C} />
    {count}
  </CommentBase>
);

Comment.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Comment;
