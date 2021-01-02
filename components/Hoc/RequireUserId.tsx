import React, { ComponentType } from 'react';

function requireUserId<TOwnProps extends { userId: number }>(
  Component: ComponentType<TOwnProps & { userId: number }>,
) {
  return function(props: TOwnProps & { userId: number | null | undefined }) {
    const { userId, ...ownProps } = props;
    return typeof userId === 'number' ? (
      <Component {...ownProps as TOwnProps} />
    ) : null;
  };
}

export default requireUserId;
