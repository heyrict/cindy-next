import React from 'react';

import Star from 'components/Star/Star';
import {
  StarInputProps,
  StarInputStates,
  StarInputDefaultProps,
} from './types';

class StarInput extends React.PureComponent<StarInputProps, StarInputStates> {
  static defaultProps = StarInputDefaultProps;

  constructor(props: StarInputProps) {
    super(props);
    this.state = {
      value: props.initialValue || 0,
      hoverValue: props.initialValue || 0,
      hover: false,
    };
  }

  render() {
    const { value, hover, hoverValue } = this.state;
    const { size } = this.props;

    return (
      <React.Fragment>
        <Star
          onClick={() => {
            const value = 1;
            if (this.props.onChange) {
              this.props.onChange(value);
            }
            this.setState({ value });
          }}
          onMouseEnter={() => {
            this.setState({
              hoverValue: 1,
              hover: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              hover: false,
            });
          }}
          opacity={hover ? 0.6 : 1}
          active={hover ? hoverValue >= 1 : value >= 1}
          fontSize={size}
        />
        <Star
          onClick={() => {
            const value = 2;
            if (this.props.onChange) {
              this.props.onChange(value);
            }
            this.setState({ value });
          }}
          onMouseEnter={() => {
            this.setState({
              hoverValue: 2,
              hover: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              hover: false,
            });
          }}
          opacity={hover ? 0.6 : 1}
          active={hover ? hoverValue >= 2 : value >= 2}
          fontSize={size}
        />
        <Star
          onClick={() => {
            const value = 3;
            if (this.props.onChange) {
              this.props.onChange(value);
            }
            this.setState({ value });
          }}
          onMouseEnter={() => {
            this.setState({
              hoverValue: 3,
              hover: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              hover: false,
            });
          }}
          opacity={hover ? 0.6 : 1}
          active={hover ? hoverValue >= 3 : value >= 3}
          fontSize={size}
        />
        <Star
          onClick={() => {
            const value = 4;
            if (this.props.onChange) {
              this.props.onChange(value);
            }
            this.setState({ value });
          }}
          onMouseEnter={() => {
            this.setState({
              hoverValue: 4,
              hover: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              hover: false,
            });
          }}
          opacity={hover ? 0.6 : 1}
          active={hover ? hoverValue >= 4 : value >= 4}
          fontSize={size}
        />
        <Star
          onClick={() => {
            const value = 5;
            if (this.props.onChange) {
              this.props.onChange(value);
            }
            this.setState({ value });
          }}
          onMouseEnter={() => {
            this.setState({
              hoverValue: 5,
              hover: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              hover: false,
            });
          }}
          opacity={hover ? 0.6 : 1}
          active={hover ? hoverValue >= 5 : value >= 5}
          fontSize={size}
        />
      </React.Fragment>
    );
  }
}

export default StarInput;
