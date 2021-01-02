import React from 'react';
import { shallow } from 'enzyme';

import UserFilterSwitcher from '../UserFilterSwitcher';
import FilterButton from '../FilterButton';

import { userFilterUsers } from './constants';

describe('<UserFilterSwitcher />', () => {
  const clickFn = jest.fn();
  let node = shallow(
    <UserFilterSwitcher users={userFilterUsers} onClick={() => {}} />,
  );

  it('Should render all users properly', () => {
    const props = {
      users: userFilterUsers.map(user => ({
        id: user.id,
        nickname: user.nickname,
        dialogueCount: user.dialogueCount,
        answeredDialogueCount: user.answeredDialogueCount,
        trueAnswer: user.trueAnswer,
      })),
      onClick: clickFn,
      activeUserId: undefined,
    };
    node = shallow(<UserFilterSwitcher {...props} />);
    userFilterUsers.forEach(user => {
      expect(
        node
          .find(FilterButton)
          .findWhere(btn => btn.text().search(user.nickname) > -1)
          .exists(),
      ).toBe(true);
    });
  });

  describe('Should call click event properly', () => {
    it('when user is clicked', () => {
      node
        .find(FilterButton)
        .findWhere(btn => btn.text().search(userFilterUsers[0].nickname) > -1)
        .first()
        .simulate('click');
      expect(clickFn).toHaveBeenLastCalledWith(userFilterUsers[0].id);
    });

    it('when all is clicked', () => {
      node
        .find(FilterButton)
        .first()
        .simulate('click');
      expect(clickFn).toHaveBeenLastCalledWith(-1);
    });
  });
});
