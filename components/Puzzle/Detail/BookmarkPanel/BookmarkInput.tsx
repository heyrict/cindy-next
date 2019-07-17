import React from 'react';

import Input from 'components/General/Input';
import Tooltip from 'components/Hoc/Tooltip';

import { BookmarkInputProps, BookmarkInputStates } from './types';

class BookmarkInput extends React.Component<
  BookmarkInputProps,
  BookmarkInputStates
> {
  constructor(props: BookmarkInputProps) {
    super(props);
    this.state = {
      value: props.initialValue || 0,
    };
  }
  render() {
    return (
      <Tooltip
        placement="top"
        reference={
          <Input
            type="range"
            width={1}
            value={this.state.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.setState({ value: parseInt(e.target.value) })
            }
          />
        }
        referenceStyles={{
          width: '100%',
        }}
        tooltip={this.state.value}
        delay={300}
      />
    );
  }
}

export default BookmarkInput;
