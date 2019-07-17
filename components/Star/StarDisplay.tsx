import React from 'react';
import Star from './Star';

import { StarDisplayProps } from './types';

const StarDisplay = ({ value, size }: StarDisplayProps) => (
  <React.Fragment>
    <Star active={value >= 1} fontSize={size} />
    <Star active={value >= 2} fontSize={size} />
    <Star active={value >= 3} fontSize={size} />
    <Star active={value >= 4} fontSize={size} />
    <Star active={value >= 5} fontSize={size} />
  </React.Fragment>
);

export default StarDisplay;
