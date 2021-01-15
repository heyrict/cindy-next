import React from 'react';

import { Input, Box, Flex } from 'components/General';
import ButtonSelectStateful from 'components/ButtonSelect/stateful';

import { SearchVarSetPanelProps, FilterFieldTypeEnum } from './types';

class SearchVarSetPanel extends React.PureComponent<SearchVarSetPanelProps> {
  textRefs: { [key: string]: React.RefObject<HTMLInputElement> } = {};
  selectRefs: { [key: string]: React.RefObject<ButtonSelectStateful> } = {};

  // {{{1 constructor()
  constructor(props: SearchVarSetPanelProps) {
    super(props);
    props.filters.forEach(filter => {
      switch (filter.type) {
        case FilterFieldTypeEnum.TEXT:
          this.textRefs[filter.key] = React.createRef<HTMLInputElement>();
        case FilterFieldTypeEnum.SELECT:
          this.selectRefs[filter.key] = React.createRef<ButtonSelectStateful>();
      }
    });
  }

  // {{{1 render()
  render() {
    return (
      <Flex width={1} flexWrap="wrap" alignItems="flex-start">
        {this.props.filters.map(filter => {
          let fieldContent = null;
          switch (filter.type) {
            case FilterFieldTypeEnum.TEXT:
              fieldContent = (
                <Input
                  width={1}
                  placeholder={filter.placeholder}
                  ref={
                    this.textRefs[
                      filter.key
                    ] as React.RefObject<HTMLInputElement>
                  }
                />
              );
              break;
            case FilterFieldTypeEnum.SELECT:
              fieldContent = (
                <ButtonSelectStateful
                  initialValue={filter.initialValue}
                  options={filter.options}
                  ref={
                    this.selectRefs[
                      filter.key
                    ] as React.RefObject<ButtonSelectStateful>
                  }
                />
              );
          }

          return (
            <Flex
              key={filter.key}
              width={1}
              px={[1, 2, 1, 2]}
              mx={1}
              mb={2}
              flexWrap="wrap"
              alignItems="center"
            >
              <Box minWidth="12em">{filter.fieldName || filter.key}</Box>
              <Box style={{ flexGrow: 1 }}>{fieldContent}</Box>
            </Flex>
          );
        })}
      </Flex>
    );
  }

  // {{{1 reset()
  reset() {
    Object.values(this.textRefs).forEach(refObj => {
      if (refObj.current) {
        refObj.current.value = '';
      }
    });

    Object.values(this.selectRefs).forEach(refObj => {
      if (refObj.current) {
        refObj.current.setState({ value: refObj.current.props.initialValue });
      }
    });
  }

  // {{{1 getData()
  getData() {
    const data: { [key: string]: any } = {};

    Object.entries(this.textRefs).forEach(([key, refObj]) => {
      if (refObj.current) {
        data[key] = refObj.current.value;
      }
    });

    Object.entries(this.selectRefs).forEach(([key, refObj]) => {
      if (refObj.current) {
        data[key] = refObj.current.state.value;
      }
    });

    return data;
  }
  // }}}1
}

export default SearchVarSetPanel;
