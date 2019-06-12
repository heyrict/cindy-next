import { Value } from 'slate';
import { deserialize } from '../convert';

const textWithStamp = 'Good :stamp-gj: Job!';

describe('Test deserialize', () => {
  it('Should work', () => {
    const document = Value.fromJS(deserialize(textWithStamp));
    document.toJS();
  });
});
