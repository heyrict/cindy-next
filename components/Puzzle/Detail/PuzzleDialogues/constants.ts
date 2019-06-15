import { DialogueHintQuery_sui_hei_dialogue } from 'graphql/Queries/generated/DialogueHintQuery';
import { ExtractUserFilterUserReturnType } from './types';

export const extractUserFilterUserFromDialogues = (
  dialogues: Array<DialogueHintQuery_sui_hei_dialogue>,
): Array<ExtractUserFilterUserReturnType> => {
  const users: {
    [userId: number]: ExtractUserFilterUserReturnType;
  } = {};
  dialogues.forEach(dialogue => {
    if (!(dialogue.sui_hei_user.id in users)) {
      users[dialogue.sui_hei_user.id] = {
        id: dialogue.sui_hei_user.id,
        nickname: dialogue.sui_hei_user.nickname,
        dialogueCount: 1,
        dialogueUnsolvedCount: dialogue.answer === '' ? 1 : 0,
        dialogueHasTrue: dialogue.true,
      };
      return;
    }

    users[dialogue.sui_hei_user.id].dialogueCount += 1;
    if (dialogue.answer === '')
      users[dialogue.sui_hei_user.id].dialogueUnsolvedCount += 1;
    if (dialogue.true) users[dialogue.sui_hei_user.id].dialogueHasTrue = true;
  });
  return Object.values(users);
};
