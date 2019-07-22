import { ValueOf } from "reducers/types";

export type HelperPayloadType = {
  type: string;
  [key: string]: any;
};

export type WrappedActionSubsetType<T = { [K: string]: string }, P = { [K in keyof T]: any }> = ValueOf<{
  [K in keyof T]: {
    type: T[K];
    payload: K extends keyof P ? P[K] : any;
  };
}>;
