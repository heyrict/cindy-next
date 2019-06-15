import React = require('react');
import { Value } from 'slate';

export type SimpleEditorProps = {
  useNamespaces?: string[];
  initialValue?: string;
  placeholder?: string;
  height?: number;
  onSubmit?: (text: string) => any;
  autoFocus?: boolean;
};

export type SimpleEditorStates = {
  value: Value;
  preview: boolean;
  stampToolbar: boolean;
  showModal: boolean;
};

export class SimpleEditor extends React.Component<
  SimpleEditorProps,
  SimpleEditorStates
> {
  state: SimpleEditorStates;
  construct(props: SimpleEditorProps): void {}
  render(): React.ReactNode {}
  getText(): string;
  setText(text: string): void;
}

export default SimpleEditor;
