import React from 'react';
import Link from 'next/link';
import { ButtonTransparent, Box } from 'components/General';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Back = () => (
  <Box width="max-content" m={2} bg="preset.button.bg" borderRadius={2}>
    <Link href="/ranking" passHref>
      <ButtonTransparentA p={1} color="preset.button.fg">
        <FormattedMessage {...commonMessages.back} />
      </ButtonTransparentA>
    </Link>
  </Box>
);

export default Back;
