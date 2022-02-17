export type StarPanelProps = {
  puzzleId: number;
  canAddStar: boolean;
};

export type StarPopupContentProps = {
  userId: number | null;
  puzzleId: number;
  starCount: number;
  setShow: (show: boolean) => void;
  buttonRef: React.RefObject<HTMLElement | null>;
  canAddStar: boolean;
};

export type AddStarContentProps = {
  userId: number;
  puzzleId: number;
};
