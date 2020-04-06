import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { StateType } from 'reducers/types';

/**
 * matchesBegin(a, b)
 *
 * Returns true if all elements in a are in the
 * same position as b.
 *
 * # Examples
 * ```javascript
 * expect(matchesBegin([1, 2], [1, 2, 3])).toBe(true);
 * expect(matchesBegin([1, 2], [1, 4, 2, 3])).toBe(false);
 * ```
 */
export function matchesBegin<T>(
  a: Array<T>,
  b: Array<T>,
  eq = (elA: T, elB: T) => elA === elB,
) {
  if (a.length > b.length) return false;

  for (let i = 0; i < a.length; i++) {
    let elA = a[i];
    let elB = b[i];
    if (!eq(elA, elB)) return false;
  }
  return true;
}

export const dialogueIdsSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (state: StateType) => addReplayReducer.rootSelector(state).dialoguePath,
  (dialogues, dialoguePath) =>
    dialogues
      .filter(dialogue =>
        matchesBegin(
          dialoguePath,
          dialogue.question_keywords.map(kw => kw.name),
        ),
      )
      .map(dialogue => dialogue.id),
);

export const nextAvailKeywordsSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (state: StateType) => addReplayReducer.rootSelector(state).dialoguePath,
  (dialogues, dialoguePath) => {
    let keywordSet = new Set<string>();
    dialogues.forEach(dialogue => {
      if (dialogue.question_keywords.length <= dialoguePath.length) return;

      if (keywordSet.has(dialogue.question_keywords[dialoguePath.length].name))
        return;

      if (
        matchesBegin(
          dialoguePath,
          dialogue.question_keywords.map(kw => kw.name),
        )
      )
        keywordSet.add(dialogue.question_keywords[dialoguePath.length].name);
    });
    return Array.from(keywordSet.keys());
  },
);
