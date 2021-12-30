import React, { useState } from 'react';

import { Flex, Box, ButtonTransparent } from 'components/General';
import QuoteBiblatex from './QuoteBiblatex';
import QuotePlain from './QuotePlain';

import { QuoteBoxProps, QuoteTabs } from './types';

const QuoteBox = ({ user, created, title }: QuoteBoxProps) => {
  const [tab, setTab] = useState(QuoteTabs.PLAIN);

  const currentTab = (() => {
    switch (tab) {
      case QuoteTabs.PLAIN:
        return <QuotePlain user={user} created={created} title={title} />;
      case QuoteTabs.BIBTEX:
        return <QuoteBiblatex user={user} created={created} title={title} />;
    }
  })();

  return (
    <Flex>
      <Flex minWidth={60} flexDirection={'column'}>
        <ButtonTransparent
          fontSize={'inherit'}
          onClick={() => setTab(QuoteTabs.PLAIN)}
        >
          Plain
        </ButtonTransparent>
        <ButtonTransparent
          fontSize={'inherit'}
          onClick={() => setTab(QuoteTabs.BIBTEX)}
        >
          Bibtex
        </ButtonTransparent>
      </Flex>
      <Box flexGrow={1}>{currentTab}</Box>
    </Flex>
  );
};

export default QuoteBox;
