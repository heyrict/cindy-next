import React from 'react';
import styled from 'theme/styled';

import Flex from 'components/General/Flex';

import { FooterProps } from './types';
import Img from 'components/General/Img';
import logoInline from 'svgs/logoInlineLight.svg';

const FooterContents = styled.div`
  position: relative;
  background: ${p => p.theme.colorthemes.light.gray[9]};
  color: ${p => p.theme.colorthemes.light.gray[1]};
  padding: ${p => p.theme.space[3]}px;
  min-height: 140px;
  box-shadow: 0 -12px 8px 5px ${p => p.theme.colorthemes.light.gray[9]};
  margin-top: 4em;
`;

const Footer = ({ children }: FooterProps) => (
  <FooterContents>
    <Flex flexWrap="wrap" justifyContent="center">
      {children}
    </Flex>
    <Flex justifyContent="center">
      <Img
        style={{ position: 'absolute', bottom: '20px' }}
        src={logoInline}
        height="sm"
        alt="Cindy"
      />
    </Flex>
  </FooterContents>
);

export default Footer;
