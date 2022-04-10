import React from 'react';
import styled from 'theme/styled';
import { keyframes } from '@emotion/react';

import Flex from './Flex';

import { LoadingProps, LoadingDefaultProps } from './types';

const LoadingBlock = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
`;

const LoadingDot = styled.div`
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${p => p.theme.colors.grape[5]};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const LoadingKeyframeEnlarge = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
`;

const LoadingKeyframeSqueeze = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
`;

const LoadingKeyframeMove = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(19px, 0);
  }
`;

const LoadingChildA = styled(LoadingDot)`
  left: 6px;
  animation: ${LoadingKeyframeEnlarge} 0.6s infinite;
`;

const LoadingChildB = styled(LoadingDot)`
  left: 6px;
  animation: ${LoadingKeyframeMove} 0.6s infinite;
`;

const LoadingChildC = styled(LoadingDot)`
  left: 26px;
  animation: ${LoadingKeyframeMove} 0.6s infinite;
`;

const LoadingChildD = styled(LoadingDot)`
  left: 45px;
  animation: ${LoadingKeyframeSqueeze} 0.6s infinite;
`;

const Loading = ({ centered }: LoadingProps) => {
  const spinner = (
    <LoadingBlock>
      <LoadingChildA />
      <LoadingChildB />
      <LoadingChildC />
      <LoadingChildD />
    </LoadingBlock>
  );

  if (centered) {
    return (
      <Flex width={1} height={1} justifyContent="center" alignItems="center">
        {spinner}
      </Flex>
    );
  }

  return spinner;
};

Loading.defaultProps = LoadingDefaultProps;

export default Loading;
