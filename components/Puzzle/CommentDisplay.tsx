import React from 'react';
import styled from 'theme/styled';
import Link from 'next/link';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, Box, Img, ButtonTransparent } from 'components/General';
import chevronYLeft from 'svgs/chevronYellowgreenLeft.svg';
import chevronYRight from 'svgs/chevronYellowgreenRight.svg';
import chevronOLeft from 'svgs/chevronOrangeLeft.svg';
import chevronORight from 'svgs/chevronOrangeRight.svg';

import {
  CommentDisplayProps,
  CommentContentProps,
  CommentDisplayStates,
} from './types';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const CommentContent = styled.div<CommentContentProps>`
  display: flex;
  position: relative;
  left: ${p => (p.on ? 0 : 'calc(100% - 30px)')};
  transition-property: left;
  transition-duration: 300ms;
  z-index: 30;
  min-height: 60px;
  width: 100%;
`;

class CommentDisplay extends React.PureComponent<
  CommentDisplayProps,
  CommentDisplayStates
> {
  state = {
    on: false,
  };

  render() {
    const { comment } = this.props;

    let currentArrow;
    if (this.state.on && comment.spoiler) {
      currentArrow = <Img height="xs" alt="detail" src={chevronORight} />;
    } else if (this.state.on && !comment.spoiler) {
      currentArrow = <Img height="xs" alt="detail" src={chevronYRight} />;
    } else if (!this.state.on && comment.spoiler) {
      currentArrow = <Img height="xs" alt="detail" src={chevronOLeft} />;
    } else {
      currentArrow = <Img height="xs" alt="detail" src={chevronYLeft} />;
    }

    return (
      <Flex
        bg="blanchedalmond"
        style={{
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid burlywood',
          minHeight: '100px',
        }}
      >
        <Box
          width="calc(100% - 30px)"
          height={1}
          mr="30px"
          p={2}
          color="darksoil"
          style={{
            position: 'absolute',
            zIndex: 20,
            top: 0,
            overflowY: 'auto',
          }}
        >
          <FormattedMessage
            {...puzzleMessages.commentDescribe}
            values={{
              user: (
                <Link
                  href={'/user/[id]'}
                  as={`/user/${comment.sui_hei_user.id}`}
                  passHref
                >
                  <ButtonTransparentA>
                    {comment.sui_hei_user.nickname}
                  </ButtonTransparentA>
                </Link>
              ),
              puzzle_user: (
                <Link
                  href={'/user/[id]'}
                  as={`/user/${comment.sui_hei_puzzle.sui_hei_user.id}`}
                  passHref
                >
                  <ButtonTransparentA>
                    {comment.sui_hei_puzzle.sui_hei_user.nickname}
                  </ButtonTransparentA>
                </Link>
              ),
              puzzle_title: (
                <Link
                  href={'/puzzle/[id]'}
                  as={`/puzzle/${comment.sui_hei_puzzle.id}`}
                >
                  <a>{comment.sui_hei_puzzle.title}</a>
                </Link>
              ),
            }}
          />
          {comment.spoiler && (
            <Box is="span" color="red">
              (<FormattedMessage {...puzzleMessages.spoilerWarning} />)
            </Box>
          )}
        </Box>
        <CommentContent on={this.state.on}>
          <ButtonTransparent
            style={{
              display: 'inline-block',
              float: 'right',
            }}
            onClick={() => this.setState(({ on }) => ({ on: !on }))}
          >
            {currentArrow}
          </ButtonTransparent>
          <Box
            width={1}
            bg={comment.spoiler ? 'pink.6' : 'lime.6'}
            p={2}
            color="white"
          >
            {comment.content}
            <div style={{ float: 'right' }}>
              ——
              <Link
                href={'/user/[id]'}
                as={`/user/${comment.sui_hei_user.id}`}
                passHref
              >
                <ButtonTransparentA color="white">
                  {comment.sui_hei_user.nickname}
                </ButtonTransparentA>
              </Link>
            </div>
          </Box>
        </CommentContent>
      </Flex>
    );
  }
}

export default CommentDisplay;
