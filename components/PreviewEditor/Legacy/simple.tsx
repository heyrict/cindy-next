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
import StampList from '../StampList';
import { ButtonFont } from '../components';

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
    const { placeholder } = this.props;
    const inlineEditor = (
      <Textarea
        width={1}
        minWidth={1}
        minHeight={`${this.props.height}em`}
        maxHeight={`${this.props.height}em`}
        bg="transparent"
        border="none"
        padding={0}
        placeholder={placeholder}
        ref={this.inlineEditor}
      />
    );
    const modalEditor = (
      <Textarea
        width={1}
        minWidth={1}
        height={`${this.props.height}em`}
        bg="transparent"
        border="none"
        padding={0}
        placeholder={placeholder}
        ref={this.modalEditor}
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
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) => this.onClickWrap(e, '**')}
              >
                <ButtonFont>
                  <b>B</b>
                </ButtonFont>
              </ButtonTransparent>
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) => this.onClickWrap(e, '*')}
              >
                <ButtonFont>
                  <i>I</i>
                </ButtonFont>
              </ButtonTransparent>
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
              <ButtonFont>|</ButtonFont>
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) =>
                  this.onClickInsert(e, '![Image](https://foo.bar/image.png)')
                }
              >
                <Img src={photoIcon} height="1.2em" />
              </ButtonTransparent>
              <ButtonTransparent
                height="2.2em"
                onClick={(e: React.MouseEvent) =>
                  this.onClickInsert(e, '[Cindy](https://www.cindythink.com/)')
                }
              >
                <Img src={urlIcon} height="1.2em" />
              </ButtonTransparent>
              <ButtonFont>|</ButtonFont>
              <ButtonTransparent
                height="2.2em"
                onClick={() => this.toggleStampToolbar()}
              >
                <Img src={stampIcon} height="1.2em" />
              </ButtonTransparent>
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
                <ButtonFont on={this.state.preview}>Preview</ButtonFont>
              </ButtonTransparent>
            </Flex>
            {this.state.stampToolbar && (
              <StampList
                useNamespaces={this.props.useNamespaces}
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
              flexWrap="wrap"
              bg="orange.4"
              height={`${this.props.height}em`}
              width={1}
              style={{ overflow: 'hidden' }}
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
            height={`${this.props.height}em`}
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
            <ButtonTransparent onClick={() => this.toggleShowModal()}>
              <Img height="xxs" src={expandIcon} />
            </ButtonTransparent>
            <ButtonTransparent onClick={() => this.toggleStampToolbar()}>
              <Img height="xxs" src={stampIcon} />
            </ButtonTransparent>
            <ButtonTransparent
              onClick={() => {
                const text = this.getText();
                this.props
                  .onSubmit(text)
                  .then(returns => {
                    if (!returns) {
                      // Cancelled
                      this.setText(text);
                      return;
                    }
                    if (returns.errors) {
                      toast.error(JSON.stringify(returns.errors));
                      this.setText(text);
                    }
                  })
                  .catch(error => {
                    toast.error(JSON.stringify(error));
                    this.setText(text);
                  });
                this.setText('');
              }}
            >
              <Img height="xxs" src={paperPlaneIcon} />
            </ButtonTransparent>
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
