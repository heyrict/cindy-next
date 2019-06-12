/**
 *
 * ButtonSelect
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Flex, ButtonTransparent, Button } from 'components/General';

const ButtonSelect = props => {
  const { onChange, buttonProps, flexProps } = props;
  return (
    <Flex flexWrap="wrap" {...flexProps}>
      {props.options.map(option =>
        option.value === props.value ? (
          <Button
            key={option.value}
            p={1}
            mr={1}
            mb={1}
            minWidth="3em"
            borderColor="orange.7"
            borderRadius={2}
            borderWidth={2}
            borderStyle="solid"
            {...buttonProps}
            onClick={() => onChange(option)}
          >
            {option.label || option.value}
          </Button>
        ) : (
          <ButtonTransparent
            key={option.value}
            p={1}
            mr={1}
            mb={1}
            minWidth="3em"
            borderColor="orange.7"
            borderRadius={2}
            borderWidth={2}
            borderStyle="solid"
            {...buttonProps}
            onClick={() => onChange(option)}
          >
            {option.label || option.value}
          </ButtonTransparent>
        ),
      )}
    </Flex>
  );
};

ButtonSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any,
    }),
  ),
  flexProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

ButtonSelect.defaultProps = {
  buttonProps: {},
  flexProps: {},
};

export default ButtonSelect;
