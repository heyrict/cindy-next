import React, { useState } from 'react';
import { line2md } from 'common/markdown';

import { Manager, Reference, Popper } from 'react-popper';
import { Anchor, Flex, Box } from 'components/General';
import { FormattedTime } from 'react-intl';

import { CurrentUserAwardProps } from './types';

const AnchorButton = Anchor.withComponent('button');

const CurrentUserAward = ({ useraward }: CurrentUserAwardProps) => {
  const [show, setShow] = useState(false);
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <AnchorButton
            ref={ref}
            onMouseEnter={() => setShow(true)}
            onFocus={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onBlur={() => setShow(false)}
          >
            [{useraward.sui_hei_award.name}]
          </AnchorButton>
        )}
      </Reference>
      {show && (
        <Popper placement="top">
          {({ ref, style, placement, arrowProps }) => (
            <Flex
              flexWrap="wrap"
              bg="orange.3"
              borderRadius={1}
              p={2}
              maxWidth="300px"
              ref={ref}
              style={{
                ...style,
                zIndex: 12,
              }}
              data-placement={placement}
            >
              <Box mt={2} mb={1} width={1} fontSize={2} textAlign="center">
                {useraward.sui_hei_award.name}
              </Box>
              <Box
                textAlign="center"
                width={1}
                my={1}
                fontSize={1}
                dangerouslySetInnerHTML={{
                  __html: line2md(useraward.sui_hei_award.description),
                }}
              />
              {useraward.created && (
                <Box width={1} textAlign="center" color="#ff582b" fontSize={1}>
                  <span role="img" aria-label="gold-cup">
                    🏆
                  </span>
                  <FormattedTime
                    value={useraward.created}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </Box>
              )}
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </Flex>
          )}
        </Popper>
      )}
    </Manager>
  );
};

export default CurrentUserAward;
