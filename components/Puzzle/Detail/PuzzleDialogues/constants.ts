import { ExtractUserFilterUserReturnType } from './types';
import {
  DialogueHintQuery_puzzleLogs_Hint,
  DialogueHintQuery_puzzleLogs_Dialogue,
} from 'graphql/Queries/generated/DialogueHintQuery';

type Dialogue = DialogueHintQuery_puzzleLogs_Dialogue;
type Hint = DialogueHintQuery_puzzleLogs_Hint;

export const extractUserFilterUserFromDialogues = (
  dialogues: Array<Dialogue | Hint>,
): Array<ExtractUserFilterUserReturnType> => {
  const users: {
    [userId: number]: ExtractUserFilterUserReturnType;
  } = {};
  dialogues.forEach(dialogue => {
    if (dialogue.__typename == 'Hint') return;

    if (!(dialogue.user.id in users)) {
      users[dialogue.user.id] = {
        id: dialogue.user.id,
        nickname: dialogue.user.nickname,
        dialogueCount: 1,
        answeredDialogueCount: dialogue.answer === '' ? 0 : 1,
        dialogueHasTrue: dialogue.true,
      };
      return;
    }

    users[dialogue.user.id].dialogueCount += 1;
    if (dialogue.answer !== '')
      users[dialogue.user.id].answeredDialogueCount += 1;
    if (dialogue.true) users[dialogue.user.id].dialogueHasTrue = true;
  });
  return Object.values(users);
};
