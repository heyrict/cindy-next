import React, { useState, useEffect, useRef } from 'react';
import { line2md } from 'common/markdown';

import { Manager, Reference, Popper } from 'react-popper';
import { Anchor, Flex, Box } from 'components/General';
import { FormattedTime } from 'react-intl';

import { CurrentUserAwardProps } from './types';

const AnchorButton = Anchor.withComponent('button');

const CurrentUserAward = ({ user_award }: CurrentUserAwardProps) => {
  const [show, setShow] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node | null) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node | null)
      ) {
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <AnchorButton
            style={{ userSelect: 'none' }}
            ref={(r: HTMLButtonElement | null) => {
              ref(r);
              btnRef.current = r;
            }}
            onTouchStart={() => setShow(true)}
            onMouseEnter={() => setShow(true)}
            onClick={() => setShow(false)}
            onMouseLeave={() => setShow(false)}
            onTouchMove={() => setShow(false)}
          >
            [{user_award.award.name}]
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
              ref={(r: HTMLDivElement | null) => {
                ref(r);
                popupRef.current = r;
              }}
              style={{
                ...style,
                zIndex: 12,
              }}
              data-placement={placement}
            >
              <Box mt={2} mb={1} width={1} fontSize={2} textAlign="center">
                {user_award.award.name}
              </Box>
              <Box
                textAlign="center"
                width={1}
                my={1}
                fontSize={1}
                dangerouslySetInnerHTML={{
                  __html: line2md(user_award.award.description),
                }}
              />
              {user_award.created && (
                <Box width={1} textAlign="center" color="#ff582b" fontSize={1}>
                  <span role="img" aria-label="gold-cup">
                    🏆
                  </span>
                  <FormattedTime
                    value={user_award.created}
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
