import { stampNamespaces } from 'stamps/types';

export const SimpleLegacyEditorDefaultProps = {
  placeholder: '',
  height: 6,
  initialValue: '',
};

export type SimpleLegacyEditorProps = {
  useNamespaces?: Array<stampNamespaces>;
  onSubmit: (text: string) => Promise<{ errors?: any } | void>;
} & typeof SimpleLegacyEditorDefaultProps;

export type SimpleLegacyEditorStates = {
  preview: boolean;
  stampToolbar: boolean;
  showModal: boolean;
};

export const LegacyEditorDefaultProps = {
  placeholder: '',
  initialValue: '',
};

export type LegacyEditorProps = {
  useNamespaces?: Array<stampNamespaces>;
} & typeof LegacyEditorDefaultProps;

export type LegacyEditorStates = {
  preview: boolean;
  stampToolbar: boolean;
};
