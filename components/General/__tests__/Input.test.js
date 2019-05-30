import Input from '../Input';
import { render } from 'enzyme';

import theme from 'lib/theme';

describe('<Input />', () => {
  it('works with current theme', () => {
    const node = render(<Input theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
