import { extractUserFilterUserFromDialogues } from '../constants';

import { dialogues } from './constants';

describe('function extractUserFilterUserFromDialogues()', () => {
  it('Dialogues should be filtered properly', () => {
    const result = extractUserFilterUserFromDialogues(dialogues);
    expect(result).toMatchSnapshot();
  });
});
