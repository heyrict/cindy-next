import React from 'react';

import { text2md } from 'common/markdown';

import {
  Flex,
  Box,
  ButtonTransparent,
  Img,
  Textarea,
} from 'components/General';
import Tooltip from 'components/Hoc/Tooltip';
import StampList from '../StampList';
import { ButtonFont, ButtonCircle } from '../components';

import { FormattedMessage } from 'react-intl';
import tooltipMessages from 'messages/tooltip';

import photoIcon from 'svgs/photo.svg';
import urlIcon from 'svgs/url.svg';
import stampIcon from 'svgs/stamp.svg';
import tabIcon from 'svgs/tab.svg';
import { TAB_TEXT } from './common';
import {
  LegacyEditorProps,
  LegacyEditorStates,
  LegacyEditorDefaultProps,
} from './types';
import { StampType } from 'stamps';

class LegacyEditor extends React.Component<
  LegacyEditorProps,
  LegacyEditorStates
> {
  static defaultProps = LegacyEditorDefaultProps;

  togglePreview: () => void;
  toggleStampToolbar: () => void;
  incHeight: (inc: number) => void;
  editor: React.RefObject<HTMLTextAreaElement>;

  // {{{1 constructor(props)
  constructor(props: LegacyEditorProps) {
    super(props);
    this.state = {
      preview: false,
      stampToolbar: false,
    };
    this.editor = React.createRef<HTMLTextAreaElement>();
    this.onClickWrap = this.onClickWrap.bind(this);
    this.onClickStamp = this.onClickStamp.bind(this);
    this.togglePreview = () => this.setState(p => ({ preview: !p.preview }));
    this.toggleStampToolbar = () =>
      this.setState(p => ({ stampToolbar: !p.stampToolbar }));
    this.incHeight = (inc: number) => {
      if (!this.editor.current) return;
      this.editor.current.style.height = `${this.editor.current.clientHeight +
        inc * 14}px`;
    };
  }

  // {{{1 componentDidMount
  componentDidMount() {
    if (this.editor.current) {
      this.editor.current.value = this.props.initialValue;
    }
  }

  // {{{1 render
  render() {
    const { initialValue, useNamespaces, ...textareaProps } = this.props;
    return (
      <Box bg="orange.1">
        <Flex flexWrap="wrap" alignItems="flex-start" width={1} bg="orange.3">
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) => this.onClickWrap(e, '**')}
              >
                <ButtonFont>
                  <b>B</b>
                </ButtonFont>
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.bold} />}
            delay={800}
          />
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) => this.onClickWrap(e, '*')}
              >
                <ButtonFont>
                  <i>I</i>
                </ButtonFont>
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.italic} />}
            delay={800}
          />
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) =>
                  this.onClickWrap(e, '<u>', '</u>')
                }
              >
                <ButtonFont>
                  <u>U</u>
                </ButtonFont>
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.underline} />}
            delay={800}
          />
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) =>
                  this.onClickWrap(e, '<del>', '</del>')
                }
              >
                <ButtonFont>
                  <del>D</del>
                </ButtonFont>
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.delete} />}
            delay={800}
          />
          <ButtonFont>|</ButtonFont>
          <ButtonTransparent
            height="2.2em"
            onClick={(e: React.MouseEvent) =>
              this.onClickWrap(e, '<span style="color: #beafab">', '</span>')
            }
          >
            <ButtonCircle color="#beafab" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={(e: React.MouseEvent) =>
              this.onClickWrap(e, '<span style="color: #c46143">', '</span>')
            }
          >
            <ButtonCircle color="#c46143" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={(e: React.MouseEvent) =>
              this.onClickWrap(e, '<span style="color: #c4a243">', '</span>')
            }
          >
            <ButtonCircle color="#c4a243" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={(e: React.MouseEvent) =>
              this.onClickWrap(e, '<span style="color: #65c443">', '</span>')
            }
          >
            <ButtonCircle color="#65c443" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={(e: React.MouseEvent) =>
              this.onClickWrap(e, '<span style="color: #43a6c4">', '</span>')
            }
          >
            <ButtonCircle color="#43a6c4" />
          </ButtonTransparent>
          <ButtonFont>|</ButtonFont>
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) =>
                  this.onClickInsert(e, '![Image](https://foo.bar/image.png)')
                }
              >
                <Img src={photoIcon} height="1.2em" />
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.picture} />}
            delay={800}
          />
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) =>
                  this.onClickInsert(e, '[Cindy](https://www.cindythink.com/)')
                }
              >
                <Img src={urlIcon} height="1.2em" />
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.href} />}
            delay={800}
          />
          <ButtonFont>|</ButtonFont>
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={() => this.toggleStampToolbar()}
              >
                <Img src={stampIcon} height="1.2em" />
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.stamp} />}
            delay={800}
          />
          <Tooltip
            reference={
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) => {
                  this.onClickWrap(e, '', TAB_TEXT);
                }}
              >
                <Img src={tabIcon} height="1.2em" />
              </ButtonTransparent>
            }
            tooltip={<FormattedMessage {...tooltipMessages.tab} />}
            delay={800}
          />
          <ButtonFont>|</ButtonFont>
          <ButtonTransparent height="2.2em" onClick={() => this.incHeight(8)}>
            <ButtonFont>＋</ButtonFont>
          </ButtonTransparent>
          <ButtonTransparent height="2.2em" onClick={() => this.incHeight(-8)}>
            <ButtonFont>−</ButtonFont>
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={() => this.togglePreview()}
          >
            <ButtonFont switchon={this.state.preview}>
              <FormattedMessage {...tooltipMessages.preview} />
            </ButtonFont>
          </ButtonTransparent>
        </Flex>
        {this.state.stampToolbar && (
          <StampList
            useNamespaces={useNamespaces}
            onClick={({ key, src }) => this.onClickStamp({ key, src })}
          />
        )}
        <Box display={this.state.preview ? 'none' : 'block'}>
          <Textarea
            width={1}
            minWidth={1}
            height="16em"
            bg="transparent"
            border="none"
            padding={0}
            ref={this.editor}
            {...textareaProps}
          />
        </Box>
        {this.state.preview && (
          <Box
            mx={2}
            height={
              this.editor.current
                ? `${this.editor.current.clientHeight}px`
                : '16em'
            }
            style={{
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{
              __html: text2md(
                this.editor.current ? this.editor.current.value : '',
              ),
            }}
          />
        )}
      </Box>
    );
  }

  // {{{1 onClickWrap
  onClickWrap = (e: React.MouseEvent, prefix: string, suffix?: string) => {
    e.preventDefault();
    if (!this.editor.current) return;
    const editor = this.editor.current;
    editor.value = `${editor.value.substring(
      0,
      editor.selectionStart,
    )}${prefix}${editor.value.substring(
      editor.selectionStart,
      editor.selectionEnd,
    )}${suffix || prefix}${editor.value.substring(editor.selectionEnd)}`;
  };

  onClickInsert = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    if (!this.editor.current) return;
    const editor = this.editor.current;
    editor.value = `${editor.value.substring(
      0,
      editor.selectionStart,
    )}${text}${editor.value.substring(editor.selectionEnd)}`;
  };

  // {{{1 onClickStamp
  onClickStamp = ({ key }: { key: StampType; src: string }) => {
    if (!this.editor.current) return;
    const editor = this.editor.current;
    editor.value = `${editor.value.substring(
      0,
      editor.selectionStart,
    )} :${key}: ${editor.value.substring(editor.selectionEnd)}`;
  };
  // }}}

  getText = () => (this.editor.current ? this.editor.current.value : '');
  setText = (text: string) => {
    if (this.editor.current) this.editor.current.value = text;
  };
}

export default LegacyEditor;
