import { takeLatest, put, select, all } from 'redux-saga/effects';
import { getPuzzleDetailPageId } from 'common/pages';
import { hash } from 'common/math';

import * as puzzleReducer from 'reducers/puzzle';
import * as globalReducer from 'reducers/global';

import { getHashStore, setHashStore } from './common';

import { RightAsideType, ActionContentType, StateType } from 'reducers/types';
import { MemoStatStoreType } from './types';

function* resetPuzzleAside() {
  yield put(puzzleReducer.actions.rightAside.set(RightAsideType.none));
}

const PUZZLE_MEMO_HASNEW_HASH_STORE_KEY = 'puzzleMemoStatus';

function* setPuzzleMemoHasnew(action: ActionContentType) {
  const innerAction = action.payload as { type: string; value: string };
  const route: string = yield select(
    (state: StateType) => globalReducer.rootSelector(state).route,
  );
  const puzzleId = getPuzzleDetailPageId(route);
  const memoStatStore = getHashStore(
    PUZZLE_MEMO_HASNEW_HASH_STORE_KEY,
  ) as MemoStatStoreType;

  if (puzzleId === null) return;

  switch (innerAction.type) {
    case 'BASE_SET': {
      if (innerAction.value === '') return;
      const memoHash = hash(innerAction.value);
      if (memoHash !== memoStatStore[puzzleId])
        yield put(puzzleReducer.actions.puzzleMemoHasnew.setTrue());
    }
    default:
      return;
  }
}

function* updatePuzzleMemoStat(action: ActionContentType) {
  const innerAction = action.payload as { type: string; value: RightAsideType };
  const memoStatStore = getHashStore(
    PUZZLE_MEMO_HASNEW_HASH_STORE_KEY,
  ) as MemoStatStoreType;
  const route: string = yield select(
    (state: StateType) => globalReducer.rootSelector(state).route,
  );
  const puzzleId = getPuzzleDetailPageId(route);
  const puzzleState: typeof puzzleReducer.initialState = yield select(
    (state: StateType) => puzzleReducer.rootSelector(state),
  );
  const puzzleMemo = puzzleState.puzzleMemo;
  const puzzleMemoHasnew = puzzleState.puzzleMemoHasnew;

  if (puzzleId === null) return;

  switch (innerAction.type) {
    case 'SET':
      switch (innerAction.value) {
        case RightAsideType.memo: {
          if (puzzleMemoHasnew === true)
            yield put(puzzleReducer.actions.puzzleMemoHasnew.setFalse());

          const memoHash = hash(puzzleMemo);
          const prevMemoHash = memoStatStore[puzzleId];
          if (memoHash !== prevMemoHash) {
            memoStatStore[puzzleId] = memoHash;
            setHashStore(PUZZLE_MEMO_HASNEW_HASH_STORE_KEY, memoStatStore);
          }
        }
        default:
          return;
      }
    default:
      return;
  }
}

function* puzzleRootSaga() {
  yield all([
    takeLatest(globalReducer.actionTypes.ROUTECHANGE, resetPuzzleAside),
    takeLatest(puzzleReducer.actionTypes.PUZZLE_MEMO, setPuzzleMemoHasnew),
    takeLatest(puzzleReducer.actionTypes.RIGHT_ASIDE, updatePuzzleMemoStat),
  ]);
}

export default puzzleRootSaga;
