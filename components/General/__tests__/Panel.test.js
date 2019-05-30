import Panel from '../Panel';
import { render } from 'enzyme';

import theme from 'lib/theme';

describe('<Panel />', () => {
  it('works with current theme', () => {
    const node = render(<Panel theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
