import { dequal } from 'dequal';

export type ParseGqlArgsResult = {
  fieldName: string;
  args: { [key: string]: any };
} | null;

export const parseGqlArgs = (storeFieldName: string): ParseGqlArgsResult => {
  const splitAt = storeFieldName.search(':');
  const fieldName = storeFieldName.slice(0, splitAt);
  const argsStr = storeFieldName.slice(splitAt + 1);
  try {
    const args = JSON.parse(argsStr);
    return { fieldName, args };
  } catch (e) {
    console.log(`common.parseArgs: ${e}`);
    return null;
  }
};

// WARNING: Use deepEqual instead
export const matchGqlArgs = (args: ParseGqlArgsResult, filter: any) =>
  dequal(args?.args, filter);
