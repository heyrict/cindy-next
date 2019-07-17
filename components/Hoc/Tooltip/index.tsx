import { Manager, Reference, Popper } from 'react-popper';
import Box from 'components/General/Box';

import { TooltipProps, TooltipDefaultProps } from './types';
import { useRef, useState } from 'react';

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
        <Popper {...popperProps}>
          {({ ref, style, placement }) => (
            <Box
              color="gray.1"
              bg="gray.9"
              borderRadius={2}
              p={1}
              ref={ref}
              style={{
                ...style,
                zIndex: 13,
                ...popperStyles,
              }}
              data-placement={placement}
            >
              {tooltip}
            </Box>
          )}
        </Popper>
      )}
    </Manager>
  );
};

Tooltip.defaultProps = TooltipDefaultProps;

export default Tooltip;
