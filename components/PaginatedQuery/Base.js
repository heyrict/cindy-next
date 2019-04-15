import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { PB_ORIENT } from './constants';

const PaginatedQueryBase = ({
  hasNextPage,
  hasPrevPage,
  currentPage,
  jumpto,
  orientation,
  ...queryProps
}) => {
  return (
    <div>
      {PB_ORIENT.top & orientation && (
        <PaginatorBar
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          currentPage={currentPage}
          jumpto={jumpto}
        />
      )}
      <Query {...queryProps} />
      {PB_ORIENT.bottom & orientation && (
        <PaginatorBar
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          currentPage={currentPage}
          jumpto={jumpto}
        />
      )}
    </div>
  );
};

PaginatedQueryBase.propTypes = {
  hasNextPage: PropTypes.bool,
  hasPrevPage: PropTypes.bool,
  currentPage: PropTypes.number,
  jumpto: PropTypes.func,
  orientation: PropTypes.number,
};

export default PaginatedQueryBase;
