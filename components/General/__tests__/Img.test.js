import Img from '../Img';
import { render } from 'enzyme';

import theme from 'lib/theme';

describe('<Img />', () => {
  it('works with current theme', () => {
    const node = render(<Img theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('works with any size', () => {
    const node = render(<Img size="2em" theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
