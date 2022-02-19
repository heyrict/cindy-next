import React, { useState } from 'react';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/stamp';

import { Box, ButtonTransparent, Img } from 'components/General';

import { stampMessageIds, StampType, stamps } from 'stamps';
import { StampListProps, StampListDefaultProps } from './types';

const StampRow = styled(Box)`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const StampList = ({ useNamespaces, onClick }: StampListProps) => {
  const [namespace, setNamespace] = useState(useNamespaces[0]);

  return (
    <React.Fragment>
      <StampRow width={1} bg="preset.editor.menu1">
        {useNamespaces.map(namespc => (
          <ButtonTransparent
            onClick={() => setNamespace(namespc)}
            key={namespc}
            borderStyle="solid"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor={namespc === namespace ? 'red.4' : 'transparent'}
            color="preset.editor.menufg"
          >
            <FormattedMessage
              {...messages[stampMessageIds[namespc] as keyof typeof messages]}
            />
          </ButtonTransparent>
        ))}
      </StampRow>
      <StampRow width={1} bg="preset.editor.menu2">
        {Object.entries(stamps[namespace]).map(([key, src]) => (
          <ButtonTransparent
            key={key}
            onClick={() =>
              onClick({ key, src } as { key: StampType; src: string })
            }
          >
            <Img height="sm" src={src} />
          </ButtonTransparent>
        ))}
      </StampRow>
    </React.Fragment>
  );
};

StampList.defaultProps = StampListDefaultProps;

export default StampList;
