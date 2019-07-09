import React from 'react';
import styled from 'theme/styled';
import patronsList from 'patrons.json';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { Box, Flex } from 'components/General';

const WhiteAnchor = styled.a`
  color: ${p => p.theme.colors.gray[1]};
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
    <Box ml={1} mr={3}>
      <FormattedMessage {...commonMessages.patron} />:
    </Box>
    {patronsList.map(patron =>
      patron.url ? (
        <WhiteAnchor key={patron.name} href={patron.url}>
          {patron.name}
        </WhiteAnchor>
      ) : (
        <WhiteSpan key={patron.name}>patron.name</WhiteSpan>
      ),
    )}
    <img
      style={{ paddingLeft: '1em', height: 'max-content' }}
      src="http://img.shields.io/liberapay/receives/heyrict.svg?logo=liberapay"
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
