import React from 'react';
import { shallow, render } from 'enzyme';

import defaultTheme from 'theme';
import { Img } from 'components/General';
import UserCol from '../UserCol';
import UserInline from '../UserInline';
import { InlineUser } from '../types';
import { UserInlineBase, UserColBase } from '../shared';
import { ThemesEnum } from 'theme/types';

const theme = {
  ...defaultTheme,
  ...defaultTheme.colorthemes.light,
  theme: ThemesEnum.LIGHT,
};

const user: InlineUser = {
  id: 1,
  nickname: 'foo',
};

const timestamp = <span>1990-01-01</span>;

const anon = {
  id: 0,
  nickname: 'anonymous',
  icon: '/path/to/anonymous.svg',
};

describe('<UserCol />', () => {
  it.skip('should work given valid user', () => {
    const node = shallow(<UserCol user={user} />);
    expect(node.contains(user.nickname)).toBe(true);
  });

  it('should work given timestamp', () => {
    const node = shallow(<UserCol user={user} timestamp={timestamp} />);
    expect(node.contains(timestamp)).toBe(true);
  });

  it('should work given anonymous user', () => {
    const node = shallow(<UserCol user={anon} />);
    expect(node.find(Img).prop('src')).toBe(anon.icon);
    expect(node.contains(anon.nickname)).toBe(true);
  });

  it('<UserColBase /> should work in the current theme', () => {
    const node = render(<UserColBase theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});

describe('<UserInline />', () => {
  it.skip('should work given valid user', () => {
    const node = shallow(<UserInline user={user} />);
    expect(node.contains(user.nickname)).toBe(true);
  });

  it('should work given timestamp', () => {
    const node = shallow(<UserInline user={user} timestamp={timestamp} />);
    expect(node.contains(timestamp)).toBe(true);
  });

  it('should work given anonymous user', () => {
    const node = shallow(<UserInline user={anon} />);
    expect(node.find(Img).prop('src')).toBe(anon.icon);
    expect(node.contains(anon.nickname)).toBe(true);
  });

  it('<UserInlineBase /> should work in the current theme', () => {
    const node = render(<UserInlineBase theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
