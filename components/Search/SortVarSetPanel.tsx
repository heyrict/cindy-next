import React from 'react';

import { Box, Flex } from 'components/General';
import ButtonSelectStateful from 'components/ButtonSelect/stateful';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { SortVarSetPanelProps, OrderByFieldType } from './types';
import { order_by } from 'generated/globalTypes';

class SortVarSetPanel extends React.PureComponent<SortVarSetPanelProps> {
  fieldRef = React.createRef<ButtonSelectStateful<string>>();
  orderRef = React.createRef<ButtonSelectStateful<order_by>>();

  // {{{1 render()
  render() {
    const { initialField } = this.props;

    return (
      <Flex width={1} flexWrap="wrap" alignItems="flex-start">
        <Flex
          width={1}
          px={[1, 2, 1, 2]}
          mx={1}
          mb={2}
          flexWrap="wrap"
          alignItems="center"
        >
          <Box minWidth="12em">
            <FormattedMessage {...commonMessages.sort} />
          </Box>
          <Flex flexGrow={1} flexWrap="wrap">
            <Box minWidth="50%" style={{ flexGrow: 1 }}>
              <ButtonSelectStateful<string>
                ref={this.fieldRef}
                initialValue={initialField}
                options={this.props.fields.map(field => ({
                  key: field.key,
                  value: field.key,
                  label: field.fieldName,
                }))}
              />
            </Box>
            <Box minWidth="50%" style={{ flexGrow: 1 }}>
              <ButtonSelectStateful<order_by>
                ref={this.orderRef}
                initialValue={order_by.desc_nulls_last}
                options={[
                  {
                    key: 'desc',
                    value: order_by.desc_nulls_last,
                    label: <FormattedMessage {...commonMessages.desc} />,
                  },
                  {
                    key: 'asc',
                    value: order_by.asc_nulls_first,
                    label: <FormattedMessage {...commonMessages.asc} />,
                  },
                ]}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  // {{{1 reset()
  reset() {
    if (this.fieldRef.current && this.orderRef.current) {
      this.fieldRef.current.setState({
        value: this.fieldRef.current.props.initialValue,
      });
      this.orderRef.current.setState({
        value: this.orderRef.current.props.initialValue,
      });
    }
  }

  // {{{1 getData()
  getData() {
    const { defaultValue } = this.props;
    let returns: Array<object> = [];
    if (this.fieldRef.current && this.orderRef.current) {
      const field = this.fieldRef.current.state.value;
      const order = this.orderRef.current.state.value;
      const orderByField = this.props.fields.find(
        f => f.key === field,
      ) as OrderByFieldType;
      const value = orderByField.getValue
        ? orderByField.getValue(order)
        : { [field]: order };
      returns = [value];

      if (defaultValue && defaultValue.length > 0 && field in defaultValue[0]) {
        returns = [...returns, ...defaultValue.slice(1)];
      } else if (defaultValue) {
        returns = [...returns, ...defaultValue];
      }
      return returns;
    }
    return defaultValue || returns;
  }
  // }}}1
}

export default SortVarSetPanel;
