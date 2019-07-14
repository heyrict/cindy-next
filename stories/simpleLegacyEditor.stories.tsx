import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Box from 'components/General/Box';

import { SimpleLegacyEditor } from 'components/PreviewEditor';

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
  const pEditor = React.createRef<SimpleLegacyEditor>();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Box width="calc(100% - 1em)" p="0.5em">
        <SimpleLegacyEditor
          ref={pEditor}
          initialValue={initialValue}
          onSubmit={value =>
            new Promise(resolve => {
              resolve(setText(value));
            })
          }
        />
        <pre>
          <code>{text}</code>
        </pre>
      </Box>
    </ThemeProvider>
  );
};

storiesOf('Editor | SimpleLegacyEditor - シンプルエディター', module)
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
