import styled from 'theme/styled';
import { fontSizeToEm } from 'common/math';
import { StyledTagProps, ButtonFontProps } from './types';

export const ButtonFont = styled.span<ButtonFontProps>`
  background-color: ${p =>
    p.switchon ? 'rgba(255, 255, 255, 0.3)' : 'initial'};
  border-radius: 2em;
  font-size: 1.2em;
  padding: 4px;
`;

export const ButtonCircle = styled.div`
  height: 1em;
  width: 1em;
  display: inline-block;
  border-radius: 1em;
  background-color: ${p => p.color};
`;

export const StyledListItem = styled.span`
  padding-left: 10px;
  line-height: 1.2em;
`;

export const StyledHr = styled.span`
  border-bottom: 2px solid #000;
  display: block;
  opacity: 0.2;
`;

export const StyledRefer = styled.span`
  font-family: sans-serif, arial;
  color: ${p => p.theme.colors.blue[6]};
`;

export const StyledLink = styled.span`
  font-family: sans-serif, arial;
  color: ${p => p.theme.colors.cyan[6]};
`;

export const StyledTag = styled.span<StyledTagProps>`
  color: ${p => p.color || 'inherit'};
  font-size: ${p =>
    p.fontSize || fontSizeToEm(p.size || '', true) || 'inherit'};
`;
