import React, { useState } from 'react';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import UserInline from 'components/User/UserInline';

import {
  CommentModalCommentContentProps,
  CommentModalCommentProps,
} from './types';
import { line2md } from 'common/markdown';

const CommentModalCommentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  border: 2px solid ${p => p.theme.colors.orange[6]};
  border-radius: ${p => p.theme.radii[2]}px;
  padding: ${p => p.theme.space[2]}px;
  margin-bottom: ${p => p.theme.space[2]}px;
  background: ${p => p.theme.colors.orange[3]};
`;

const CommentModalCommentContent = styled.div<CommentModalCommentContentProps>`
  display: block;
  filter: ${p => (p.blurred ? 'blur(5px)' : 'none')};
`;

const CommentModalCommentUser = styled.div`
  display: inline-box;
  float: right;
  &:before {
    content: '——';
    display: inline-box;
    margin-right: 0.5em;
  }
`;

const CommentModalCommentSpoilerBlocker = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  font-size: 1.25em;
  font-weight: bold;
  z-index: 10;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const CommentModalComment = ({ comment }: CommentModalCommentProps) => {
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <CommentModalCommentWrapper>
      <CommentModalCommentContent blurred={comment.spoiler && !showSpoiler}>
        <div dangerouslySetInnerHTML={{ __html: line2md(comment.content) }} />
        <CommentModalCommentUser>
          <UserInline user={comment.user} />
        </CommentModalCommentUser>
      </CommentModalCommentContent>
      {comment.spoiler && !showSpoiler && (
        <CommentModalCommentSpoilerBlocker onClick={() => setShowSpoiler(true)}>
          <FormattedMessage {...puzzleMessages.spoilerWarning} />
        </CommentModalCommentSpoilerBlocker>
      )}
    </CommentModalCommentWrapper>
  );
};

export default CommentModalComment;
