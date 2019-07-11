import React from 'react';

import ButtonSelect from '.';

import {
  ButtonSelectStatefulProps,
  ButtonSelectStatefulStates,
  buttonSelectStatefulDefaultProps,
} from './types';

class ButtonSelectStateful<TValue = any> extends React.PureComponent<
  ButtonSelectStatefulProps<TValue>,
  ButtonSelectStatefulStates<TValue>
> {
  static defaultProps = buttonSelectStatefulDefaultProps;

  constructor(props: ButtonSelectStatefulProps<TValue>) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  render() {
    const { options, ...others } = this.props;

    return (
      <ButtonSelect<TValue>
        value={this.state.value}
        options={options}
        onChange={option => {
          this.setState({
            value: option.value,
          });
        }}
        {...others}
      />
    );
  }
}

export default ButtonSelectStateful;
