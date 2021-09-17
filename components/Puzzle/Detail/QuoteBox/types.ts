import { InlineUser } from 'components/User/types';

export type QuoteBoxProps = {
  user: InlineUser;
  created: string;
  title: string;
};

export type QuoteBiblatexProps = QuoteBoxProps;

export type QuotePlainProps = QuoteBoxProps;

export enum QuoteTabs {
  PLAIN,
  BIBTEX,
}
