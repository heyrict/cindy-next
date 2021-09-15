/**
 *
 * ButtonSelect
 *
 */
import React from 'react';

import { Flex, ButtonTransparent, Button } from 'components/General';
import { ButtonSelectProps, buttonSelectDefaultProps } from './types';
import Tooltip from 'components/Hoc/Tooltip';

function ButtonSelect<TValue = any>(props: ButtonSelectProps<TValue>) {
  const { onChange, buttonProps, flexProps } = props;
  return (
    <Flex flexWrap="wrap" {...flexProps}>
      {props.options.map(option => {
        let button =
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
          );

        return option.hint ? (
          <Tooltip reference={button} tooltip={option.hint} delay={800} />
        ) : (
          button
        );
      })}
    </Flex>
  );
}

ButtonSelect.defaultProps = buttonSelectDefaultProps;

export default ButtonSelect;
