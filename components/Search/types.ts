import { ButtonSelectOptionType } from 'components/ButtonSelect/types';
import { order_by } from 'generated/globalTypes';

export enum FilterFieldTypeEnum {
  TEXT = 'text',
  SELECT = 'select',
}

export type TextFilterFieldType = {
  type: FilterFieldTypeEnum.TEXT;
  key: string;
  placeholder?: string;
  fieldName?: React.ReactNode;
};

export type SelectFilterFieldType = {
  type: FilterFieldTypeEnum.SELECT;
  key: string;
  initialValue: any;
  fieldName?: React.ReactNode;
  options: Array<ButtonSelectOptionType>;
};

export type OrderByFieldType = {
  key: string;
  getValue?: (order: order_by) => object;
  fieldName?: React.ReactNode;
};

export type SearchVarSetPanelProps = {
  filters: Array<TextFilterFieldType | SelectFilterFieldType>;
};

export type SortVarSetPanelProps = {
  fields: Array<OrderByFieldType>;
  initialField: string;
  defaultValue?: Array<{ [key: string]: order_by }>;
};
