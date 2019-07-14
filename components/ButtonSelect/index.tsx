/**
 *
 * ButtonSelect
 *
 */
import React from 'react';

import { Flex, ButtonTransparent, Button } from 'components/General';
import { ButtonSelectProps, buttonSelectDefaultProps } from './types';

function ButtonSelect<TValue = any>(props: ButtonSelectProps<TValue>) {
  const { onChange, buttonProps, flexProps } = props;
  return (
    <Flex flexWrap="wrap" {...flexProps}>
      {props.options.map(option =>
        option.value === props.value ? (
          <Button
            key={option.key}
            p={1}
            mr={1}
            mb={1}
            minWidth="3em"
            borderColor="orange.7"
            borderRadius={2}
            borderWidth={2}
            borderStyle="solid"
            {...buttonProps}
            onClick={() => typeof onChange === 'function' && onChange(option)}
          >
            {option.label || option.value}
          </Button>
        ) : (
          <ButtonTransparent
            key={option.key}
            p={1}
            mr={1}
            mb={1}
            minWidth="3em"
            borderColor="orange.7"
            borderRadius={2}
            borderWidth={2}
            borderStyle="solid"
            {...buttonProps}
            onClick={() => typeof onChange === 'function' && onChange(option)}
          >
            {option.label || option.value}
          </ButtonTransparent>
        ),
      )}
    </Flex>
  );
}

ButtonSelect.defaultProps = buttonSelectDefaultProps;

export default ButtonSelect;
