import { stampNamespaces } from 'stamps/types';
import { StampType } from 'stamps';

export const StampListDefaultProps = {
  useNamespaces: Object.keys(stampNamespaces),
};

export type StampListClickCallbackType = {
  key: StampType;
  src: string;
};

export type StampListProps = {
  useNamespaces: Array<keyof typeof stampNamespaces>;
  onClick: (stampName: StampListClickCallbackType) => void;
};

export type ButtonFontProps = {
  switchon?: boolean;
};

export type ButtonCircleProps = {
  color: string;
};

export type StyledTagProps = {
  color?: string;
  fontSize?: string;
  size?: string;
};

export type ImageListProps = {
  userId: number;
  puzzleId?: number | null;
  onClick: (src: string) => void;
};
