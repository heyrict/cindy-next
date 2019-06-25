import { allStamps } from './stamps';

export { stampDefs, stamps, allStamps, stampMessageIds } from './stamps';
export { stampNamespaces } from './types';

export type StampType = keyof typeof allStamps;
