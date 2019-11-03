import React from 'react';
import styled from 'theme/styled';
import patronsList from 'patrons.json';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import userMessages from 'messages/components/user';

import { Box, Flex } from 'components/General';

const WhiteAnchor = styled.a`
  color: ${p => p.theme.colors.gray[1]};
  margin-right: ${p => p.theme.space[1]}px;
  &:hover {
    color: ${p => p.theme.colors.gray[2]};
  }
  &:active {
    color: ${p => p.theme.colors.gray[3]};
  }
`;

const WhiteSpan = WhiteAnchor.withComponent('span');

const Patrons = () => (
  <Flex flexWrap="wrap" alignItems="center" color="gray.1">
    <Box mx={1}>
      <FormattedMessage {...commonMessages.patron} />:
    </Box>
    {patronsList.patrons.map(
      patron =>
        patron.anonymous === false &&
        (patron.url ? (
          <WhiteAnchor key={patron.name} href={patron.url}>
            {patron.name}
          </WhiteAnchor>
        ) : (
          <WhiteSpan key={patron.name}>{patron.name}</WhiteSpan>
        )),
    )}
    {patronsList.anonymousPatrons > 0 && (
      <Box mr={1}>
        <FormattedMessage
          {...userMessages.withAnonymousPatrons}
          values={{ count: patronsList.anonymousPatrons }}
        />
      </Box>
    )}
    <img
      style={{ paddingLeft: '1em', height: 'max-content' }}
      src="https://img.shields.io/liberapay/receives/heyrict.svg?logo=liberapay"
    />
    <a style={{ paddingLeft: '1em' }} href="https://liberapay.com/heyrict">
      <img
        alt="Donate using Liberapay"
        src="https://liberapay.com/assets/widgets/donate.svg"
      />
    </a>
  </Flex>
);

export default Patrons;
