import React from 'react';
import styled from 'theme/styled';

import { Box, Flex } from 'components/General';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { SimplePaginatorBarProps, SqBtnProps } from './types';

const SqBtn = styled.a<SqBtnProps>`
  padding: 5px;
  margin: 5px 0;
  max-width: 40px;
  max-height: 40px;
  border: 3px solid
    ${p => (p.disabled ? p.theme.colors.gray[4] : p.theme.colors.blue[5])};
  color: ${p => (p.disabled ? p.theme.colors.gray[5] : p.theme.colors.blue[6])};
  border-radius: ${p => p.theme.radii[2]}px;
  ${p => p.disabled && `cursor: default;`}
  ${p =>
    !p.disabled &&
    `&:hover {
       background: rgba(0, 0, 0, 0.05);
     }
     &:active {
       background: rgba(0, 0, 0, 0.1);
     }`}
`;

const SqInput = styled.input`
  border: 3px solid ${p => p.theme.colors.blue[5]};
  color: ${p => p.theme.colors.gray[8]};
  background-color: ${p => p.theme.colors.blue[0]};
  border-right: none;
  border-radius: 10px 0 0 10px;
  padding: 3px 3px;
  margin-left: 5px;
  max-width: 60px;
  max-height: 60px;
`;

const SqIndic = styled.div`
  display: inline-box;
  color: ${p => p.theme.colors.gray[8]};
  background-color: ${p => p.theme.colors.blue[0]};
  border: 3px solid ${p => p.theme.colors.blue[5]};
  border-right: none;
  border-left: none;
  font-weight: bold;
  padding: 3px 3px;
  max-width: 60px;
  max-height: 60px;
`;

const SqSubmit = styled.button`
  border: 2px solid ${p => p.theme.colors.blue[5]};
  border-radius: 0 10px 10px 0;
  border-left: 0;
  color: ${p => p.theme.colors.blue[0]};
  background-color: ${p => p.theme.colors.blue[5]};
  font-weight: bold;
  padding: 3px 3px;
  margin-right: 5px;
  max-width: 60px;
  max-height: 60px;
`;

class SimplePaginatorBar extends React.Component<SimplePaginatorBarProps> {
  inputRef = React.createRef<HTMLInputElement>()!;
  render() {
    const prevBtn = (
      <SqBtn
        rel="prev"
        disabled={this.props.page === 1}
        onClick={() =>
          this.props.page > 1 &&
          this.props.setPage(this.confinePage(this.props.page - 1))
        }
      >
        <FormattedMessage {...commonMessages.prev} />
      </SqBtn>
    );

    const nextBtn = (
      <SqBtn
        rel="next"
        disabled={this.props.page === this.props.numPages}
        onClick={() =>
          this.props.page < this.props.numPages &&
          this.props.setPage(this.confinePage(this.props.page + 1))
        }
      >
        <FormattedMessage {...commonMessages.next} />
      </SqBtn>
    );

    return (
      <Flex width={1} alignItems="center" justifyContent="space-between">
        <Box ml={2} mr="auto">
          {prevBtn}
        </Box>
        <Flex mx="auto">
          <SqInput
            ref={this.inputRef}
            placeholder={this.props.page.toString()}
            onKeyDown={this.handleKeyDown}
          />
          <SqIndic>/ {this.props.numPages}</SqIndic>
          <SqSubmit onClick={() => this.handleSubmit()}>
            <FormattedMessage {...commonMessages.jump} />
          </SqSubmit>
        </Flex>
        <Box mr={2} ml="auto">
          {nextBtn}
        </Box>
      </Flex>
    );
  }

  confinePage = (page: number, maxNum = this.props.numPages, minNum = 1) => {
    const pageInt = Math.floor(page);
    if (pageInt < minNum) return minNum;
    if (pageInt > maxNum) return maxNum;
    return page;
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') this.handleSubmit();
  };

  handleSubmit = () => {
    if (!this.inputRef.current) return;

    let nextPage;
    const page = parseInt(this.inputRef.current.value, 10);
    if (!Number.isNaN(page)) {
      nextPage = this.confinePage(page);
      if (this.props.page !== nextPage) {
        this.props.setPage(nextPage);
      }
    }
    this.inputRef.current.value = '';
  };
}

export default SimplePaginatorBar;
