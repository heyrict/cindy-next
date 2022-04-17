declare module 'fnv-plus' {
  export type Keyspace = 32 | 52 | 64 | 128 | 256 | 512 | 1024;

  export type HashObj = {
    bits: Keyspace;
    value: number;
    dec: () => string;
    str: () => string;
    hex: () => string;
  };

  export function hash(message: string | object, keyspace?: Keyspace): HashObj;
}
