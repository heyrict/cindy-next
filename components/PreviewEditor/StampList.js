import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/stamp';

import { Box, ButtonTransparent, Img } from 'components/General';

import { kameoStamps, chefStamps, puzzleStamps } from 'stamps';

const StampRow = styled(Box)`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const stampNamespaces = {
  kameo: kameoStamps,
  chef: chefStamps,
  puzzle: puzzleStamps,
};

const stampMessageIds = {
  kameo: 'namespace_kameo',
  chef: 'namespace_chef',
  puzzle: 'namespace_puzzle',
};

const StampList = ({ useNamespaces, onClick }) => {
  const [namespace, setNamespace] = useState(useNamespaces[0]);

  return (
    <React.Fragment>
      <StampRow width={1} bg="orange.3">
        {useNamespaces.map(namespc => (
          <ButtonTransparent
            onClick={() => setNamespace(namespc)}
            key={namespc}
            borderStyle="solid"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor={namespc === namespace ? 'red.4' : 'transparent'}
          >
            <FormattedMessage {...messages[stampMessageIds[namespc]]} />
          </ButtonTransparent>
        ))}
      </StampRow>
      <StampRow width={1} bg="orange.2">
        {Object.entries(stampNamespaces[namespace]).map(([key, src]) => (
          <ButtonTransparent key={key} onClick={() => onClick({ key, src })}>
            <Img height="sm" src={src} />
          </ButtonTransparent>
        ))}
      </StampRow>
    </React.Fragment>
  );
};

StampList.propTypes = {
  useNamespaces: PropTypes.arrayOf(
    PropTypes.oneOf(Object.keys(stampNamespaces)),
  ),
  onClick: PropTypes.func.isRequired,
};

StampList.defaultProps = {
  useNamespaces: Object.keys(stampNamespaces),
};

export default StampList;
