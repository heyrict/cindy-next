import React from 'react';
import { Link } from 'routes';
import { ButtonTransparent, Box } from 'components/General';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const Back = () => (
  <Box width="max-content" m={2} bg="orange.7" borderRadius={2}>
    <Link to="ranking" passHref>
      <ButtonTransparentA p={1} color="orange.1">
        <FormattedMessage {...commonMessages.back} />
      </ButtonTransparentA>
    </Link>
  </Box>
);

export default Back;
