import Button from '../Button';
import { render } from 'enzyme';

import theme from 'lib/theme';

describe('<Button />', () => {
  it('works with current theme', () => {
    const node = render(<Button theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
