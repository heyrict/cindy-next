import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Button from 'components/General/Button';
import Box from 'components/General/Box';

import { SimpleSlateEditor } from 'components/PreviewEditor';

import {
  initialStamps,
  initialMarkdown,
  initialMonoWidth,
  initialMultiLineBreaks,
} from './editorTexts';

type EditorWithTextProps = {
  initialValue: string;
};

const EditorWithText = ({ initialValue }: EditorWithTextProps) => {
  const [text, setText] = useState('');
  const pEditor = React.createRef<SimpleSlateEditor>();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Box width="calc(100% - 1em)" p="0.5em">
        <SimpleSlateEditor
          ref={pEditor}
          initialValue={initialValue}
          onSubmit={value => setText(value)}
        />
        <pre>
          <code>{text}</code>
        </pre>
      </Box>
    </ThemeProvider>
  );
};

storiesOf('Editor | SimpleSlateEditor - シンプルエディター', module)
  .add('markdown | マークダウン', () => (
    <EditorWithText initialValue={initialMarkdown} />
  ))
  .add('stamp | スタンプ', () => (
    <EditorWithText initialValue={initialStamps} />
  ))
  .add('monoFont | 等幅フォント', () => (
    <EditorWithText initialValue={initialMonoWidth} />
  ))
  .add('multiLineBreaks | 複数改行', () => (
    <EditorWithText initialValue={initialMultiLineBreaks} />
  ));
