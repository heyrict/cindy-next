import LinkButton from '../LinkButton';
import { render } from 'enzyme';

import theme from 'lib/theme';

describe('<LinkButton />', () => {
  it('works with current theme', () => {
    const node = render(<LinkButton theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
