import * as awardCheckerReducer from 'reducers/awardChecker';
import { GlobalUserType } from 'reducers/types';
import { AwardsInfoQuery_sui_hei_user_by_pk } from 'graphql/Queries/generated/AwardsInfoQuery';

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
}

export type AwardTableRendererProps = {
  awardsObj: { [key: number]: number };
  header: React.ReactNode;
  checker: (count: number, awardId: number) => AwardStatusType;
};
