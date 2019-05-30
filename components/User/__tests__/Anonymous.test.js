import { shallow } from 'enzyme';

import { AnonymousUserInline, AnonymousUserCol } from '../Anonymous';

describe.each([AnonymousUserInline, AnonymousUserCol])('<%p />', Anonymous => {
  it('should work out of the box', () => {
    const node = shallow(<Anonymous />);
    expect(node.exists()).toBe(true);
  });

  it('should work given nickname', () => {
    const nickname = 'foo';
    const node = shallow(<Anonymous nickname={nickname} />);
    expect(node.prop('user').nickname).toBe(nickname);
  });
});
