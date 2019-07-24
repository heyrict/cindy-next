export enum WatchObjectActionType {
  ToBottom = 'toBottom', // Go to bottom on value changes
  Stay = 'stay', // Stay previous scrollHeight from bottom
  StayOrBottom = 'stayOrBottom',
  /* Convenience action for handling scrolling when
   * element length changes, specifically:
   *
   * 1. Stay in the previous position from bottom when messages loaded at top.
   * 2. Scroll to bottom smoothly when new message added in the bottom.
   *
   * Whether to use method 1 or 2 depends on the current
   * `scrollTop` position of the scroller.
   *
   * Note: smooth will not work with this action.
   */
  DoNothing = 'doNothing',
}

export type WatchObjectType = {
  name?: string; // Optional name, for logging purposes.
  value: any; // Value that should be watched for changes.
  action: WatchObjectActionType;
  smooth?: 'smooth' | 'auto';
  wait?: number;
  log?: boolean;
};

export type KeepBottomProps = {
  mount?: WatchObjectType;
  watch: Array<WatchObjectType>;
  children: ({
    scrollerRef,
  }: {
    scrollerRef: React.Ref<any>;
  }) => React.ReactNode;
};

export type LoadMoreVisProps = {
  wait?: number;
  loadMore: () => void;
  children?: React.ReactNode;
  key?: string;
};

export type DelayRenderingProps = {
  wait?: number;
  loading?: React.ReactNode;
  children?: React.ReactNode;
  key?: string;
};
