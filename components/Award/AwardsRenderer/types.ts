import * as awardCheckerReducer from 'reducers/awardChecker';
import { GlobalUserType } from 'reducers/types';
import { AwardsInfoQuery_sui_hei_user_by_pk } from 'graphql/Queries/generated/AwardsInfoQuery';
import { AllAwardsQuery_sui_hei_award } from 'graphql/Queries/generated/AllAwardsQuery';

export type AwardsRendererProps = {
  user: GlobalUserType;
};

export type AllAwardsProps = {
  userInfo?: AwardsInfoQuery_sui_hei_user_by_pk;
};

export type AllAwardsWithUserProps = {
  userId: number;
  initAwardCount: (state: typeof awardCheckerReducer.initialState) => void;
};

export enum AwardStatusType {
  GET,
  REACH,
  WAIT,
  UNKNOWN,
}

export type AwardTableRendererProps<T = number> = {
  awardsDefs: AllAwardsQuery_sui_hei_award[];
  awardsObj: { [awardId: number]: T };
  header: React.ReactNode;
  checker: (awardId: number, awardObj: T) => AwardStatusType;
  getStatusLabel: (awardObj: T) => React.ReactNode;
  userInfo?: AwardsInfoQuery_sui_hei_user_by_pk;
};
