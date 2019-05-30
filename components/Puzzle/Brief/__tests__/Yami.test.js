import React from 'react';
import { shallow } from 'enzyme';

import { Yami, YamiText, YamiImage } from '../Yami';

const defaultProps = {
  yami: 0,
  showGenreImage: false,
};

describe('<Yami />', () => {
  describe('<Yami showGenreImage={...} />', () => {
    it('render Image if showGenreImage === true', () => {
      const props = { ...defaultProps, showGenreImage: true };
      const node = shallow(<Yami {...props} />);
      expect(node.contains(<YamiImage yami={props.yami} />)).toBe(true);
    });

    it('render Text if showGenreImage === false', () => {
      const props = { ...defaultProps, showGenreImage: false };
      const node = shallow(<Yami {...props} />);
      expect(node.contains(<YamiText yami={props.yami} />)).toBe(true);
    });
  });

  describe('<YamiImage yami={...} />', () => {
    it('<YamiImage yami={0} />', () => {
      const node = shallow(<YamiImage yami={0} />);
      expect(node.isEmptyRender()).toBe(true);
    });

    it.each`
      yami | src
      ${1} | ${'yami'}
      ${2} | ${'longtermYami'}
    `('<YamiImage yami={$yami} />', ({ yami, src }) => {
      const node = shallow(<YamiImage yami={yami} />);
      expect(node.prop('src')).toContain(src);
    });
  });

  describe('<YamiText yami={...} />', () => {
    it('<YamiText yami={0} />', () => {
      const node = shallow(<YamiText yami={0} />);
      expect(node.isEmptyRender()).toBe(true);
    });

    it.each`
      yami | src
      ${1} | ${'yami'}
      ${2} | ${'longtermYami'}
    `('<YamiText yami={$yami} />', ({ yami, src }) => {
      const node = shallow(<YamiText yami={yami} />);
      expect(node.find('FormattedMessage').prop('id')).toContain(src);
    });
  });
});
