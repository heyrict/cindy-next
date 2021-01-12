import { useMemo } from 'react';

import { initializeStore } from '../reducers';

export function useRedux(initialState, serverSideContext) {
  const store = useMemo(
    () => initializeStore(initialState, serverSideContext),
    [initialState],
  );
  return store;
}
