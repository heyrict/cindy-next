import { stampNamespaces } from 'stamps/types';
import { StampType } from 'stamps';

export const StampListDefaultProps = {
  useNamespaces: Object.keys(stampNamespaces),
}

export type StampListClickCallbackType = {
  key: StampType;
  src: string;
};

export type StampListProps = {
  useNamespaces: Array<keyof typeof stampNamespaces>;
  onClick: (stampName: StampListClickCallbackType) => void;
};
