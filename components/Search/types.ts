import { ButtonSelectOptionType } from 'components/ButtonSelect/types';

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
  initialValue: any,
  fieldName?: React.ReactNode;
  options: Array<ButtonSelectOptionType>;
};

export type SearchVarSetPanelProps = {
  filters: Array<TextFilterFieldType | SelectFilterFieldType>;
};
