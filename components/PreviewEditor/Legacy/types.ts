import { stampNamespaces } from 'stamps/types';

export const SimpleLegacyEditorDefaultProps = {
  placeholder: '',
  height: 6,
  initialValue: '',
  canExpand: true,
};

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onSubmit' | 'value'
>;

export type SimpleLegacyEditorProps = {
  useNamespaces?: Array<stampNamespaces>;
  onSubmit: (text: string) => Promise<{ errors?: any } | void>;
} & typeof SimpleLegacyEditorDefaultProps &
  TextareaProps;

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
} & typeof LegacyEditorDefaultProps &
  TextareaProps;

export type LegacyEditorStates = {
  preview: boolean;
  stampToolbar: boolean;
};
