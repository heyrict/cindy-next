import Heading from '../Heading';
import { render } from 'enzyme';

import theme from 'theme';

describe('<Heading />', () => {
  it('works with current theme', () => {
    const node = render(<Heading theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
