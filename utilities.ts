export type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;
