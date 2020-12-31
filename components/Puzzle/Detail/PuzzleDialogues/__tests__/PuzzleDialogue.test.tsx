import React from 'react';
import { shallow } from 'enzyme';

import PuzzleDialogue from '../PuzzleDialogue';
import { AnonymousUserInline } from 'components/User/Anonymous';

import { dialogues, puzzle } from './constants';

const defaultProps = {
  dialogue: dialogues[0],
  puzzleUser: puzzle.user,
  puzzleStatus: puzzle.status,
  anonymous: puzzle.anonymous,
};

describe('<PuzzleDialogue />', () => {
  it('Should render properly', () => {
    shallow(<PuzzleDialogue {...defaultProps} />);
  });
  describe('Should render index properly', () => {
    const index = 42;
    let node = shallow(<PuzzleDialogue index={index} {...defaultProps} />);

    it('Should render question index', () => {
      expect(
        node.findWhere(component => component.text() === `Q${index}`).exists(),
      ).toBe(true);
    });

    it('Should render answer index if answer is given', () => {
      expect(
        node.findWhere(component => component.text() === `A${index}`).exists(),
      ).toBe(true);
    });

    it('Else, answer index should not be rendered', () => {
      const propsWithAnsweredDialogue = {
        ...defaultProps,
        index,
        dialogue: {
          ...defaultProps.dialogue,
          answer: '',
          answeredTime: null,
        },
      };
      node = shallow(<PuzzleDialogue {...propsWithAnsweredDialogue} />);
      expect(
        node.findWhere(component => component.text() === `A${index}`).exists(),
      ).toBe(false);
    });
  });

  describe('Should apply anonymous to answer properly', () => {
    it.each`
      anonymous | status | hideIdentity
      ${false}  | ${0}   | ${false}
      ${true}   | ${0}   | ${true}
      ${true}   | ${1}   | ${false}
    `(
      'Hide Identity = $hideIdentity if anonymous = $anonymous and status = $status',
      ({ anonymous, status, hideIdentity }) => {
        const props = {
          ...defaultProps,
          anonymous,
          puzzleStatus: status,
        };
        const node = shallow(<PuzzleDialogue {...props} />);

        expect(node.find(AnonymousUserInline).exists()).toBe(hideIdentity);
      },
    );
  });
});
