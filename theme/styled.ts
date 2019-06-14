import styled, { CreateStyled } from '@emotion/styled';
import theme from './theme';

type ThemeType = typeof theme;

export default styled as CreateStyled<ThemeType>;
