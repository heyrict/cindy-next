import { InlineUser } from 'components/User/types';
import { LicenseBrief } from 'graphql/Fragments/generated/LicenseBrief';

export type QuoteBoxProps = {
  user: InlineUser;
  created: string;
  title: string;
  license: LicenseBrief;
};

export type QuoteBiblatexProps = QuoteBoxProps;

export type QuotePlainProps = QuoteBoxProps;

export enum QuoteTabs {
  PLAIN,
  BIBTEX,
}
