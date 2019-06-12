import React from 'react';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { fontSizeToEm } from 'common/math';
import { text2md } from 'common/markdown';

import { Editor } from 'slate-react';
import { Block, Value } from 'slate';

import { Flex, Box, ButtonTransparent, Img } from 'components/General';
import { deserialize, serialize } from './convert';
import StampList from './StampList';

import photoIcon from 'svgs/photo.svg';
import urlIcon from 'svgs/url.svg';
import stampIcon from 'svgs/stamp.svg';

// {{{ Prism definitions
(Prism.languages.markdown = Prism.languages.extend('markup', {})),
  Prism.languages.insertBefore('markdown', 'prolog', {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
    code: [
      { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
      { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
    ],
    h1: [
      {
        pattern: /^# .+/m,
        lookbehind: !0,
        alias: 'important',
        inside: { punctuation: /^#+|#+$/ },
      },
      {
        pattern: /\w+.*(?:\r?\n|\r)(?:==+)/,
        alias: 'important',
        inside: { punctuation: /==+$/ },
      },
    ],
    h2: [
      {
        pattern: /^## .+/m,
        lookbehind: !0,
        alias: 'important',
        inside: { punctuation: /^#+|#+$/ },
      },
      {
        pattern: /\w+.*(?:\r?\n|\r)(?:--+)/,
        alias: 'important',
        inside: { punctuation: /--+$/ },
      },
    ],
    h3: {
      pattern: /^### .+/m,
      lookbehind: !0,
      alias: 'important',
      inside: { punctuation: /^#+|#+$/ },
    },
    h4: {
      pattern: /^#### .+/m,
      lookbehind: !0,
      alias: 'important',
      inside: { punctuation: /^#+|#+$/ },
    },
    h5: {
      pattern: /^##### .+/m,
      lookbehind: !0,
      alias: 'important',
      inside: { punctuation: /^#+|#+$/ },
    },
    hr: {
      pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: 'punctuation',
    },
    list: {
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: 'punctuation',
    },
    'url-reference': {
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: 'url',
    },
    bold: {
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^[*_]|[*_]$/ },
    },
    del: {
      pattern: /(^|[^\\])(~~)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^~~|~~$/ },
    },
    url: {
      pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
      },
    },
    /*
    fontTag: {
      pattern: /<font(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:\"[^\"]*\"|'[^']*'|[^\s'\">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>([^>]+)<\/font>/,
      inside: {
        attrName: /^[^\s>\/:]+:/,
        attrValue: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
      },
    },
    */
  }),
  (Prism.languages.markdown.bold.inside.url = Prism.util.clone(
    Prism.languages.markdown.url,
  )),
  (Prism.languages.markdown.italic.inside.url = Prism.util.clone(
    Prism.languages.markdown.url,
  )),
  (Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
    Prism.languages.markdown.italic,
  )),
  (Prism.languages.markdown.italic.inside.bold = Prism.util.clone(
    Prism.languages.markdown.bold,
  ));
// }}}

// {{{ styled components
const ButtonFont = styled.span`
  background-color: ${p => (p.on ? 'rgba(255, 255, 255, 0.3)' : 'initial')};
  border-radius: 2em;
  font-size: 1.2em;
  padding: 4px;
`;

const ButtonCircle = styled.div`
  height: 1em;
  width: 1em;
  display: inline-block;
  border-radius: 1em;
  background-color: ${p => p.color};
`;

const StyledListItem = styled.span`
  padding-left: 10px;
  line-height: 1.2em;
`;

const StyledHr = styled.span`
  border-bottom: 2px solid #000;
  display: block;
  opacity: 0.2;
`;

const StyledRefer = styled.span`
  font-family: sans-serif, arial;
  color: ${p => p.theme.colors.blue[6]};
`;

const StyledLink = styled.span`
  font-family: sans-serif, arial;
  color: ${p => p.theme.colors.cyan[6]};
`;

const StyledTag = styled.span`
  color: ${p => p.color || 'inherit'};
  font-size: ${p => p.fontSize || fontSizeToEm(p.size, true) || 'inherit'};
`;
// }}}

class PreviewEditor extends React.Component {
  static defaultProps = {
    initialValue: '',
    placeholder: '',
  };
  static propTypes = {
    useNamespaces: PropTypes.array,
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
  };

  // {{{ schema
  schema = {
    inlines: {
      stamp: {
        isVoid: true,
        data: {
          key: v => Boolean(v),
          src: v => Boolean(v),
        },
      },
    },
  };
  // }}}

  ref = editor => {
    this.editor = editor;
  };

  // {{{1 constructor(props)
  constructor(props) {
    super(props);
    this.state = {
      value: deserialize(props.initialValue),
      preview: false,
      stampToolbar: false,
      height: 20,
    };
    this.onClickWrap = this.onClickWrap.bind(this);
    this.onClickStamp = this.onClickStamp.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
    this.renderDecoration = this.renderDecoration.bind(this);
    this.renderInline = this.renderInline.bind(this);
    this.decorateNode = this.decorateNode.bind(this);
    this.togglePreview = () => this.setState(p => ({ preview: !p.preview }));
    this.toggleStampToolbar = () =>
      this.setState(p => ({ stampToolbar: !p.stampToolbar }));
    this.incHeight = inc =>
      this.setState(p => ({
        height: p.height + inc > 10 ? p.height + inc : 10,
      }));
  }

  // {{{1 render
  render() {
    const { placeholder } = this.props;
    return (
      <Box bg="orange.1" pb={1}>
        <Flex flexWrap="wrap" alignItems="baseline" width={1} bg="orange.3">
          <ButtonTransparent
            height="2.2em"
            onClick={e => this.onClickWrap(e, '**')}
          >
            <ButtonFont>
              <b>B</b>
            </ButtonFont>
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e => this.onClickWrap(e, '*')}
          >
            <ButtonFont>
              <i>I</i>
            </ButtonFont>
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e => this.onClickWrap(e, '<u>', '</u>')}
          >
            <ButtonFont>
              <u>U</u>
            </ButtonFont>
          </ButtonTransparent>
          <ButtonFont>|</ButtonFont>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickWrap(e, '<span style="color: #beafab">', '</span>')
            }
          >
            <ButtonCircle color="#beafab" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickWrap(e, '<span style="color: #c46143">', '</span>')
            }
          >
            <ButtonCircle color="#c46143" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickWrap(e, '<span style="color: #c4a243">', '</span>')
            }
          >
            <ButtonCircle color="#c4a243" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickWrap(e, '<span style="color: #65c443">', '</span>')
            }
          >
            <ButtonCircle color="#65c443" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickWrap(e, '<span style="color: #43a6c4">', '</span>')
            }
          >
            <ButtonCircle color="#43a6c4" />
          </ButtonTransparent>
          <ButtonFont>|</ButtonFont>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickInsert(e, '![Image](https://foo.bar/image.png)')
            }
          >
            <Img src={photoIcon} height="1.2em" />
          </ButtonTransparent>
          <ButtonTransparent
            height="2.2em"
            onClick={e =>
              this.onClickInsert(e, '[Cindy](https://www.cindythink.com/)')
            }
          >
            <Img src={urlIcon} height="1.2em" />
          </ButtonTransparent>
          <ButtonFont>|</ButtonFont>
          <ButtonTransparent
            height="2.2em"
            onClick={e => this.toggleStampToolbar()}
          >
            <Img src={stampIcon} height="1.2em" />
          </ButtonTransparent>
          <ButtonFont>|</ButtonFont>
          <ButtonTransparent height="2.2em" onClick={e => this.incHeight(8)}>
            <ButtonFont>＋</ButtonFont>
          </ButtonTransparent>
          <ButtonTransparent height="2.2em" onClick={e => this.incHeight(-8)}>
            <ButtonFont>−</ButtonFont>
          </ButtonTransparent>
          <ButtonTransparent height="2.2em" onClick={e => this.togglePreview()}>
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
          my={2}
          height={`${this.state.height}em`}
          style={{ overflow: 'scroll' }}
        >
          <Box display={this.state.preview ? 'none' : 'block'}>
            <Editor
              placeholder={this.props.placeholder}
              ref={this.ref}
              value={this.state.value}
              onChange={({ value }) => {
                this.setState({ value });
              }}
              schema={this.schema}
              renderBlock={this.renderBlock}
              renderInline={this.renderInline}
              decorateNode={this.decorateNode}
              renderDecoration={this.renderDecoration}
              autoFocus
            />
          </Box>
          {this.state.preview && (
            <Box
              mx={2}
              dangerouslySetInnerHTML={{
                __html: text2md(serialize(this.state.value)),
              }}
            />
          )}
        </Box>
      </Box>
    );
  }

  // {{{1 renderBlock
  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'paragraph':
        return <div {...attributes}>{children}</div>;
      default:
        return next();
    }
  };

  // {{{1 renderInline
  renderInline = (props, editor, next) => {
    const { attributes, node, isFocused } = props;

    switch (node.type) {
      case 'stamp':
        return (
          <Img
            {...attributes}
            contentEditable={false}
            onDrop={e => e.preventDefault()}
            isFocused={isFocused}
            height="md"
            src={node.data.get('src')}
          />
        );
      default:
        return next();
    }
  };

  // {{{1 decorateNode
  decorateNode(node, editor, next) {
    const others = next() || [];
    if (node.object !== 'block') return others;

    const string = node.text;
    const texts = Array.from(node.texts());
    const grammar = Prism.languages.markdown;
    const tokens = Prism.tokenize(string, grammar);
    const decorations = [];
    let startEntry = texts.shift();
    let endEntry = startEntry;
    let nextEntry;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;

    function getLength(token) {
      if (typeof token === 'string') {
        return token.length;
      } else if (typeof token.content === 'string') {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    }

    for (const token of tokens) {
      startEntry = endEntry;
      startOffset = endOffset;

      const [startText, startPath] = startEntry;
      const length = getLength(token);
      const end = start + length;

      let available = startText.text.length - startOffset;
      let remaining = length;

      endOffset = startOffset + remaining;

      while (available < remaining) {
        nextEntry = texts.shift();
        if (nextEntry === undefined) break;
        endEntry = nextEntry;
        const [endText, endPath] = endEntry;
        remaining = length - available;
        available = endText.text.length;
        endOffset = remaining;
      }

      const [endText, endPath] = endEntry;

      if (typeof token !== 'string') {
        const data = {};
        switch (token.type) {
          case 'url-reference': {
            const reference = token.content.find(
              t => t.type && t.type === 'variable',
            );
            const url = token.content.find(t => typeof t === 'string');
            if (reference && url) {
              data.reference = reference.content;
              data.url = url;
            }
          }
          case 'tag': {
            let prevAttrName, prevAttrValue;
            token.content.forEach(o => {
              switch (o.type) {
                case 'attr-name':
                  prevAttrName = o.content.find(c => typeof c === 'string');
                  break;
                case 'attr-value':
                  prevAttrValue = o.content.find(c => typeof c === 'string');
                  data[prevAttrName] = prevAttrValue;
                  break;
                case 'style-attr':
                  const style = o.content.find(c => c.type === 'attr-value');
                  style.content.forEach(s => {
                    if (typeof s === 'string') {
                      prevAttrValue = s.trim();
                      if (prevAttrValue) {
                        data[prevAttrName] = prevAttrValue;
                      }
                    } else if (s.type === 'property') {
                      prevAttrName = s.content;
                    }
                  });
              }
            });
          }
        }

        const dec = {
          type: token.type,
          data,
          anchor: {
            key: startText.key,
            path: startPath,
            offset: startOffset,
          },
          focus: {
            key: endText.key,
            path: endPath,
            offset: endOffset,
          },
        };
        decorations.push(dec);
      }
      start = end;
    }
    return [...others, ...decorations];
  }

  // {{{1 renderDecoration
  renderDecoration(props, editor, next) {
    const { children, decoration, attributes } = props;

    switch (decoration.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      case 'del':
        return <del {...attributes}>{children}</del>;
      case 'h1':
        return <h1 {...attributes}>{children}</h1>;
      case 'h2':
        return <h2 {...attributes}>{children}</h2>;
      case 'h3':
        return <h3 {...attributes}>{children}</h3>;
      case 'h4':
        return <h4 {...attributes}>{children}</h4>;
      case 'h5':
        return <h5 {...attributes}>{children}</h5>;
      case 'punctuation':
        return (
          <span {...attributes} style={{ opacity: 0.2 }}>
            {children}
          </span>
        );
      case 'list':
        return <StyledListItem {...attributes}>{children}</StyledListItem>;
      case 'hr':
        return <StyledHr {...attributes}>{children}</StyledHr>;
      case 'url':
        return <StyledLink {...attributes}>{children}</StyledLink>;
      case 'url-reference':
        return <StyledRefer {...attributes}>{children}</StyledRefer>;
      case 'tag':
        return (
          <StyledTag
            color={decoration.data.get('color')}
            size={decoration.data.get('size')}
            fontSize={decoration.data.get('font-size')}
            {...attributes}
          >
            {children}
          </StyledTag>
        );
      default:
        return next();
    }
  }

  // {{{1 onClickWrap
  onClickWrap = (e, prefix, suffix) => {
    e.preventDefault();
    this.editor
      .wrapText(prefix, suffix || prefix)
      .moveToStartOfNextText()
      .focus();
  };

  onClickInsert = (e, text) => {
    e.preventDefault();
    this.editor
      .insertText(text)
      .moveToEndOfText()
      .focus();
  };

  // {{{1 onClickStamp
  onClickStamp = ({ key, src }) => {
    this.editor
      .insertInline({ type: 'stamp', data: { key, src } })
      .moveToStartOfNextText()
      .focus();
  };
  // }}}

  getText = () => serialize(this.state.value);
}

export default PreviewEditor;