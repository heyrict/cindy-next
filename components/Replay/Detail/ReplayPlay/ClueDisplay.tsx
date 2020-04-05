import React, { useState, useEffect, useRef } from 'react';
import { line2md } from 'common/markdown';

import { Manager, Reference, Popper } from 'react-popper';
import { Anchor, Flex, Box } from 'components/General';

import { ClueDisplayProps } from './types';

const AnchorButton = Anchor.withComponent('button');

const ClueDisplay = ({ milestone }: ClueDisplayProps) => {
  const [show, setShow] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null!);
  const btnRef = useRef<HTMLButtonElement>(null!);

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
            ref={(r: HTMLButtonElement) => {
              ref(r);
              btnRef.current = r;
            }}
            onTouchStart={() => setShow(true)}
            onMouseEnter={() => setShow(true)}
            onClick={() => setShow(false)}
            onMouseLeave={() => setShow(false)}
            onTouchMove={() => setShow(false)}
          >
            {milestone.name}
          </AnchorButton>
        )}
      </Reference>
      {show && (
        <Popper placement="left">
          {({ ref, style, placement, arrowProps }) => (
            <Flex
              flexWrap="wrap"
              bg="teal.3"
              borderRadius={1}
              p={2}
              maxWidth="300px"
              ref={(r: HTMLDivElement) => {
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
                {milestone.name}
              </Box>
              <Box
                textAlign="center"
                width={1}
                my={1}
                fontSize={1}
                dangerouslySetInnerHTML={{
                  __html: line2md(milestone.description),
                }}
              />
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </Flex>
          )}
        </Popper>
      )}
    </Manager>
  );
};

export default ClueDisplay;
