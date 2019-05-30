import Anchor from '../Anchor';
import { render } from 'enzyme';

import theme from 'lib/theme';

describe('<Anchor />', () => {
  it('works with current theme', () => {
    const node = render(<Anchor theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
