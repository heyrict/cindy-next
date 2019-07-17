export type BookmarkPanelProps = {
  puzzleId: number;
};

export type BookmarkPopoverContentProps = {
  userId?: number;
  puzzleId: number;
  setShow: (show: boolean) => void;
  buttonRef: React.RefObject<HTMLElement | null>;
};

export type BookmarkInputProps = {
  initialValue?: number;
}

export type BookmarkInputStates = {
  value: number;
}
