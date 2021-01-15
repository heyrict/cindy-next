import * as awardCheckerReducer from 'reducers/awardChecker';
import { GlobalUserType } from 'reducers/types';
import { AwardsInfoQuery_user } from 'graphql/Queries/generated/AwardsInfoQuery';
import { AllAwardsQuery_awards } from 'graphql/Queries/generated/AllAwardsQuery';

export type AwardsRendererProps = {
  user: GlobalUserType;
};

export type AllAwardsProps = {
  userInfo?: AwardsInfoQuery_user;
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
  awardsDefs: AllAwardsQuery_awards[];
  awardsObj: { [awardId: number]: T };
  header: React.ReactNode;
  checker: (awardId: number, awardObj: T) => AwardStatusType;
  getStatusLabel: (awardObj: T) => React.ReactNode;
  userInfo?: AwardsInfoQuery_user;
};
