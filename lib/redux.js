import { useMemo } from 'react';

import { initializeStore } from '../reducers';

export function useRedux(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
