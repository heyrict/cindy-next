import { DialogueHintQuery_dialogue } from 'graphql/Queries/generated/DialogueHintQuery';
import { ExtractUserFilterUserReturnType } from './types';

export const extractUserFilterUserFromDialogues = (
  dialogues: Array<DialogueHintQuery_dialogue>,
): Array<ExtractUserFilterUserReturnType> => {
  const users: {
    [userId: number]: ExtractUserFilterUserReturnType;
  } = {};
  dialogues.forEach(dialogue => {
    if (!(dialogue.user.id in users)) {
      users[dialogue.user.id] = {
        id: dialogue.user.id,
        nickname: dialogue.user.nickname,
        dialogueCount: 1,
        dialogueUnsolvedCount: dialogue.answer === '' ? 1 : 0,
        dialogueHasTrue: dialogue.true,
      };
      return;
    }

    users[dialogue.user.id].dialogueCount += 1;
    if (dialogue.answer === '')
      users[dialogue.user.id].dialogueUnsolvedCount += 1;
    if (dialogue.true) users[dialogue.user.id].dialogueHasTrue = true;
  });
  return Object.values(users);
};
