import { deserialize } from '../convert';

const textWithStamp = 'Good :stamp-gj: Job!';

describe('Test deserialize', () => {
  it('Should work', () => {
    const document = deserialize(textWithStamp);
    document.toJS();
  });
});
