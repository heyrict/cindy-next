/**
 *
 * ButtonSelect
 *
 */
import React from 'react';

import { Flex, ButtonTransparent, Button } from 'components/General';
import { ButtonSelectProps, buttonSelectDefaultProps } from './types';

const ButtonSelect = (props: ButtonSelectProps) => {
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

ButtonSelect.defaultProps = buttonSelectDefaultProps;

export default ButtonSelect;
