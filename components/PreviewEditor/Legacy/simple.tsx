import React from 'react';
import { toast } from 'react-toastify';

import { text2md } from 'common/markdown';

import {
  Flex,
  Box,
  ButtonTransparent,
  Img,
  Textarea,
} from 'components/General';
import theme from 'theme/theme';
import Tooltip from 'components/Hoc/Tooltip';
import StampList from '../StampList';
import { ButtonFont } from '../components';

import { FormattedMessage } from 'react-intl';
import tooltipMessages from 'messages/tooltip';
import commonMessages from 'messages/common';

import paperPlaneIcon from 'svgs/paperPlane.svg';
import expandIcon from 'svgs/expand.svg';
import photoIcon from 'svgs/photo.svg';
import urlIcon from 'svgs/url.svg';
import stampIcon from 'svgs/stamp.svg';

import {
  SimpleLegacyEditorProps,
  SimpleLegacyEditorStates,
  SimpleLegacyEditorDefaultProps,
} from './types';
import { StampType } from 'stamps';
import { Modal } from 'components/Modal';

class SimpleLegacyEditor extends React.Component<
  SimpleLegacyEditorProps,
  SimpleLegacyEditorStates
> {
  static defaultProps = SimpleLegacyEditorDefaultProps;

  togglePreview: () => void;
  toggleStampToolbar: () => void;
  incHeight: (inc: number) => void;
  modalEditor: React.RefObject<HTMLTextAreaElement>;
  inlineEditor: React.RefObject<HTMLTextAreaElement>;
  toggleShowModal: () => void;

  // {{{1 constructor(props)
  constructor(props: SimpleLegacyEditorProps) {
    super(props);
    this.state = {
      preview: false,
      stampToolbar: false,
      showModal: false,
    };
    this.inlineEditor = React.createRef<HTMLTextAreaElement>();
    this.modalEditor = React.createRef<HTMLTextAreaElement>();
    this.onClickWrap = this.onClickWrap.bind(this);
    this.onClickStamp = this.onClickStamp.bind(this);
    this.toggleShowModal = () => {
      if (!this.inlineEditor.current || !this.modalEditor.current) return;
      if (this.state.showModal) {
        this.inlineEditor.current.value = this.modalEditor.current.value;
      } else {
        this.modalEditor.current.value = this.inlineEditor.current.value;
      }
      this.setState(p => ({
        showModal: !p.showModal,
        preview: false,
        stampToolbar: false,
      }));
    };
    this.togglePreview = () => this.setState(p => ({ preview: !p.preview }));
    this.toggleStampToolbar = () =>
      this.setState(p => ({ stampToolbar: !p.stampToolbar }));
    this.incHeight = (inc: number) => {
      if (!this.modalEditor.current) return;
      this.modalEditor.current.style.height = `${this.modalEditor.current
        .clientHeight +
        inc * 14}px`;
    };
  }

  // {{{1 componentDidMount
  componentDidMount() {
    if (this.modalEditor.current) {
      this.modalEditor.current.value = this.props.initialValue;
    }
    if (this.inlineEditor.current) {
      this.inlineEditor.current.value = this.props.initialValue;
    }
  }

  // {{{1 render
  render() {
    const {
      height,
      initialValue,
      useNamespaces,
      onSubmit,
      canExpand,
      ...textareaProps
    } = this.props;
    const inlineEditor = (
      <Textarea
        width={1}
        minWidth={1}
        minHeight={theme.sizes.chatinput}
        maxHeight={theme.sizes.chatinput}
        bg="transparent"
        border="none"
        padding={0}
        ref={this.inlineEditor}
        {...textareaProps}
      />
    );
    const modalEditor = (
      <Textarea
        width={1}
        minWidth={1}
        height={`${height}em`}
        bg="transparent"
        border="none"
        padding={0}
        ref={this.modalEditor}
        {...textareaProps}
      />
    );

    return (
      <React.Fragment>
        <Modal show={this.state.showModal}>
          <Box
            bg="orange.1"
            borderStyle="solid"
            borderColor="orange.3"
            borderWidth={1}
          >
            <Flex
              flexWrap="wrap"
              alignItems="flex-start"
              width={1}
              bg="orange.3"
            >
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
              <Tooltip
                reference={
                  <ButtonTransparent
                    height="2.2em"
                    onClick={(e: React.MouseEvent) =>
                      this.onClickInsert(
                        e,
                        '![Image](https://foo.bar/image.png)',
                      )
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
                      this.onClickInsert(
                        e,
                        '[Cindy](https://www.cindythink.com/)',
                      )
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
              <ButtonFont>|</ButtonFont>
              <ButtonTransparent
                height="2.2em"
                onClick={() => this.incHeight(8)}
              >
                <ButtonFont>＋</ButtonFont>
              </ButtonTransparent>
              <ButtonTransparent
                height="2.2em"
                onClick={() => this.incHeight(-8)}
              >
                <ButtonFont>−</ButtonFont>
              </ButtonTransparent>
              <ButtonTransparent
                height="2.2em"
                onClick={() => this.togglePreview()}
              >
                <ButtonFont on={this.state.preview}>
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
            <Box
              display={this.state.preview ? 'none' : 'block'}
              borderLeft="3px solid"
              borderRight="3px solid"
              borderColor="orange.3"
            >
              {modalEditor}
            </Box>
            {this.state.preview && (
              <Box
                mx={2}
                height={
                  this.modalEditor.current
                    ? `${this.modalEditor.current.clientHeight}px`
                    : '16em'
                }
                style={{ overflow: 'auto' }}
                dangerouslySetInnerHTML={{
                  __html: text2md(
                    this.modalEditor.current
                      ? this.modalEditor.current.value
                      : '',
                  ),
                }}
              />
            )}
          </Box>
          <ButtonTransparent
            bg="orange.4"
            color="black"
            py={2}
            onClick={() => this.toggleShowModal()}
          >
            OK
          </ButtonTransparent>
        </Modal>
        <Flex
          alignItems="center"
          width={1}
          bg="orange.3"
          style={{
            fontSize: 12,
            display: this.state.showModal ? 'none' : 'flex',
          }}
        >
          {this.state.stampToolbar && (
            <Flex
              m={1}
              flexDirection="column"
              flexWrap="nowrap"
              bg="orange.4"
              height={theme.sizes.chatinput}
              width={1}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.6"
            >
              <StampList
                onClick={({ key, src }) => {
                  this.onClickStamp({ key, src });
                  window.setTimeout(this.toggleStampToolbar, 20);
                }}
              />
            </Flex>
          )}
          <Box
            m={1}
            width={1}
            height={theme.sizes.chatinput}
            style={{
              overflow: 'hidden',
              flexGrow: 1,
              display: this.state.stampToolbar ? 'none' : 'block',
              cursor: 'text',
            }}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.6"
            bg="orange.1"
          >
            {inlineEditor}
          </Box>
          <Flex flexDirection="column" pr={1}>
            {canExpand && (
              <Tooltip
                reference={
                  <ButtonTransparent onClick={() => this.toggleShowModal()}>
                    <Img height="xxs" src={expandIcon} />
                  </ButtonTransparent>
                }
                tooltip={<FormattedMessage {...tooltipMessages.expand} />}
                delay={800}
              />
            )}
            <Tooltip
              reference={
                <ButtonTransparent onClick={() => this.toggleStampToolbar()}>
                  <Img height="xxs" src={stampIcon} />
                </ButtonTransparent>
              }
              tooltip={<FormattedMessage {...tooltipMessages.stamp} />}
              delay={800}
            />
            <Tooltip
              reference={
                <ButtonTransparent
                  onClick={() => {
                    const text = this.getText();
                    const result = onSubmit(text);
                    if (result) {
                      result
                        .then(returns => {
                          if (returns.errors) {
                            toast.error(JSON.stringify(returns.errors));
                            this.setText(text);
                          }
                        })
                        .catch(error => {
                          toast.error(JSON.stringify(error));
                          this.setText(text);
                        });
                    } else {
                      // Cancelled
                      this.setText(text);
                      return;
                    }
                    this.setText('');
                  }}
                >
                  <Img height="xxs" src={paperPlaneIcon} />
                </ButtonTransparent>
              }
              tooltip={<FormattedMessage {...commonMessages.send} />}
              delay={800}
            />
          </Flex>
        </Flex>
      </React.Fragment>
    );
  }

  // {{{1 getCurrentEditor
  getCurrentEditor = () => {
    return this.state.showModal ? this.modalEditor : this.inlineEditor;
  };
  // }}}

  // {{{1 onClickWrap
  onClickWrap = (e: React.MouseEvent, prefix: string, suffix?: string) => {
    e.preventDefault();
    const currentEditor = this.getCurrentEditor();
    if (!currentEditor.current) return;
    const editor = currentEditor.current;
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
    const currentEditor = this.getCurrentEditor();
    if (!currentEditor.current) return;
    const editor = currentEditor.current;
    editor.value = `${editor.value.substring(
      0,
      editor.selectionStart,
    )}${text}${editor.value.substring(editor.selectionEnd)}`;
  };

  // {{{1 onClickStamp
  onClickStamp = ({ key }: { key: StampType; src: string }) => {
    const currentEditor = this.getCurrentEditor();
    if (!currentEditor.current) return;
    const editor = currentEditor.current;
    editor.value = `${editor.value.substring(
      0,
      editor.selectionStart,
    )} :${key}: ${editor.value.substring(editor.selectionEnd)}`;
  };
  // }}}

  getText = () => {
    const currentEditor = this.getCurrentEditor();
    if (!currentEditor.current) return '';
    return currentEditor.current.value;
  };
  setText = (text: string) => {
    const currentEditor = this.getCurrentEditor();
    if (!currentEditor.current) return '';
    currentEditor.current.value = text;
  };
}

export default SimpleLegacyEditor;
