import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Button from 'components/General/Button';
import Box from 'components/General/Box';

import { LegacyEditor } from 'components/PreviewEditor';

import {
  initialStamps,
  initialMarkdown,
  initialHtmlFont,
  initialHtmlStyle,
  initialMonoWidth,
  initialMultiLineBreaks,
  initialTabs,
} from './editorTexts';

type EditorWithTextProps = {
  initialValue: string;
};

const EditorWithText = ({ initialValue }: EditorWithTextProps) => {
  const [text, setText] = useState('');
  const pEditor = React.createRef<LegacyEditor>();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Box width="calc(100% - 1em)" p="0.5em">
        <LegacyEditor
          ref={pEditor}
          initialValue={initialValue}
          placeholder="placeholder"
        />
        <Button
          onClick={() => {
            setText(pEditor.current ? pEditor.current.getText() : '');
          }}
        >
          GetText
        </Button>
        <pre>
          <code>{text}</code>
        </pre>
      </Box>
    </ThemeProvider>
  );
};

storiesOf('Editor | LegacyEditor - 旧プレビュー付きエディター', module)
  .add('markdown | マークダウン', () => (
    <EditorWithText initialValue={initialMarkdown} />
  ))
  .add('stamp | スタンプ', () => (
    <EditorWithText initialValue={initialStamps} />
  ))
  .add('monoFont | 等幅フォント', () => (
    <EditorWithText initialValue={initialMonoWidth} />
  ))
  .add('htmlFont | HTML フォントタグ', () => (
    <EditorWithText initialValue={initialHtmlFont} />
  ))
  .add('htmlStyle | HTML スタイリング', () => (
    <EditorWithText initialValue={initialHtmlStyle} />
  ))
  .add('tabs | タブ', () => <EditorWithText initialValue={initialTabs} />)
  .add('multiLineBreaks | 複数改行', () => (
    <EditorWithText initialValue={initialMultiLineBreaks} />
  ));
