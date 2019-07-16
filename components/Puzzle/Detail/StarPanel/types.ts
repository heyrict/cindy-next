export type StarPanelProps = {
  puzzleId: number;
};

export type StarPopupContentProps = {
  userId?: number;
  puzzleId: number;
  starCount: number;
  setShow: (show: boolean) => void;
  buttonRef: React.RefObject<HTMLElement | null>;
};
