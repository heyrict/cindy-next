import React, { useRef, useState } from 'react';

import { Portal } from 'react-portal';
import { Manager, Reference, Popper } from 'react-popper';
import Box from 'components/General/Box';

import { TooltipProps, TooltipDefaultProps } from './types';

const Tooltip = ({
  reference,
  tooltip,
  delay,
  referenceStyles,
  popperStyles,
  ...popperProps
}: TooltipProps) => {
  const [show, setShow] = useState(false);
  const timeoutHandle = useRef<number | null>(null);

  const handleShow = () => {
    if (timeoutHandle.current) window.clearTimeout(timeoutHandle.current);
    timeoutHandle.current = window.setTimeout(() => setShow(true), delay);
  };

  const handleHide = () => {
    if (timeoutHandle.current) window.clearTimeout(timeoutHandle.current);
    setShow(false);
  };

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <Box
            style={referenceStyles}
            ref={ref}
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
          >
            {reference}
          </Box>
        )}
      </Reference>
      {show && (
        <Portal>
          <Popper {...popperProps}>
            {({ ref, style, placement }) => (
              <Box
                color="preset.tooltip.fg"
                bg="preset.tooltip.bg"
                borderRadius={2}
                p={1}
                ref={ref}
                style={{
                  ...style,
                  zIndex: 800,
                  ...popperStyles,
                }}
                data-placement={placement}
              >
                {tooltip}
              </Box>
            )}
          </Popper>
        </Portal>
      )}
    </Manager>
  );
};

Tooltip.defaultProps = TooltipDefaultProps;

export default Tooltip;
