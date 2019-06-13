import React = require('react');
import { Value } from 'slate';

export type PreviewEditorProps = {
  useNamespaces?: string[];
  initialValue?: string;
  placeholder?: string;
};

export type PreviewEditorStates = {
  value: Value;
  preview: boolean;
  stampToolbar: boolean;
  height: number;
};

export class PreviewEditor extends React.Component<
  PreviewEditorProps,
  PreviewEditorStates
> {
  state: PreviewEditorStates;
  construct(props: PreviewEditorProps): void {}
  render(): React.ReactNode {}
  getText(): string;
}

export default PreviewEditor;
