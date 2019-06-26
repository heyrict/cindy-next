import React, { useState } from 'react';

import { ButtonTransparent, Img } from 'components/General';
import HintDisplay from './HintDisplay';
import HintEdit from './HintEdit';
import pencilIcon from 'svgs/pencil.svg';

import { HintModeSelectorProps } from './types';

const HintModeSelector = ({ hint }: HintModeSelectorProps) => {
  const [edit, setEdit] = useState(false);
  return edit ? (
    <HintEdit hint={hint} setEdit={setEdit} />
  ) : (
    <React.Fragment>
      <HintDisplay hint={hint} />
      <ButtonTransparent onClick={() => setEdit(true)}>
        <Img size="1em" src={pencilIcon} alt="edit" />
      </ButtonTransparent>
    </React.Fragment>
  );
};

export default HintModeSelector;
