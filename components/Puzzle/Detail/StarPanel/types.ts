export type StarPanelProps = {
  puzzleId: number;
  canAddStar: boolean;
};

export type StarPopupContentProps = {
  userId?: number;
  puzzleId: number;
  starCount: number;
  setShow: (show: boolean) => void;
  buttonRef: React.RefObject<HTMLElement | null>;
  canAddStar: boolean;
};
