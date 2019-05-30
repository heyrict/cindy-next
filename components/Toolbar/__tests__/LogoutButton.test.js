import { shallow } from 'enzyme';

import { LogoutButton } from '../LogoutButton';

describe('<LogoutButton />', () => {
  it('should call logout() when button clicked', () => {
    const logout = jest.fn();
    const node = shallow(<LogoutButton logout={logout} />);

    expect(logout.mock.calls.length).toBe(0);
    node.find('Styled(button)').simulate('click');
    expect(logout.mock.calls.length).toBe(1);
  });
});
