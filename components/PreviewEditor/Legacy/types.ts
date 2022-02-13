import { stampNamespaces } from 'stamps/types';

export enum LegacyEditorPreviewMode {
  line2md,
  text2md,
}

export const SimpleLegacyEditorDefaultProps = {
  placeholder: '',
  height: 16,
  initialValue: '',
  canExpand: true,
  previewMode: LegacyEditorPreviewMode.text2md,
};

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onSubmit' | 'value'
>;

export type SimpleLegacyEditorProps = {
  useNamespaces?: Array<stampNamespaces>;
  onSubmit?: (
    text: string,
  ) => Promise<{ errors?: any; [key: string]: any }> | undefined;
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
  showImages: false,
};

export type LegacyEditorProps = {
  useNamespaces?: Array<stampNamespaces>;
  userId?: number;
  puzzleId?: number | null;
} & typeof LegacyEditorDefaultProps &
  TextareaProps;

export type LegacyEditorStates = {
  preview: boolean;
  stampToolbar: boolean;
  imageToolbar: boolean;
};
