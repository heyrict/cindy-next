import React from 'react';
import { shallow } from 'enzyme';

import { Genre, GenreText, GenreImage } from '../Genre';

import { Genre as GenreEnum } from 'generated/globalTypes';

const defaultProps = {
  genre: GenreEnum.CLASSIC,
  showGenreImage: false,
};

describe('<Genre />', () => {
  describe('<Genre showGenreImage={...} />', () => {
    it('render Image if showGenreImage === true', () => {
      const props = { ...defaultProps, showGenreImage: true };
      const node = shallow(<Genre {...props} />);
      expect(node.contains(<GenreImage genre={props.genre} />)).toBe(true);
    });

    it('render Text if showGenreImage === false', () => {
      const props = { ...defaultProps, showGenreImage: false };
      const node = shallow(<Genre {...props} />);
      expect(node.contains(<GenreText genre={props.genre} />)).toBe(true);
    });
  });

  describe('<GenreImage genre={...} />', () => {
    it.each`
      genre | src
      ${0}  | ${'classic'}
      ${1}  | ${'twentyQuestions'}
      ${2}  | ${'littleAlbat'}
      ${3}  | ${'others'}
    `('<GenreImage genre={$genre} />', ({ genre, src }) => {
      const node = shallow(<GenreImage genre={genre} />);
      expect(node.prop('src')).toContain(src);
    });

    it('<GenreImage genre={others} />', () => {
      const node = shallow(<GenreImage genre={GenreEnum.OTHERS} />);
      expect(node.isEmptyRender()).toBe(true);
    });
  });

  describe('<GenreText genre={...} />', () => {
    it.each`
      genre | src
      ${0}  | ${'classic'}
      ${1}  | ${'twentyQuestions'}
      ${2}  | ${'littleAlbat'}
      ${3}  | ${'others'}
    `('<GenreText genre={$genre} />', ({ genre, src }) => {
      const node = shallow(<GenreText genre={genre} />);
      expect(node.find('FormattedMessage').prop('id')).toContain(src);
    });

    it('<GenreText genre={others} />', () => {
      const node = shallow(<GenreText genre={GenreEnum.OTHERS} />);
      expect(node.isEmptyRender()).toBe(true);
    });
  });
});
