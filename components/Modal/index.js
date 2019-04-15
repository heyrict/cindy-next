import styled from '@emotion/styled';
import { Button } from 'components/General';

export { default as Modal } from './Modal';

export const FooterButton = styled(Button)`
  padding: 10px;
  border-radius: 5px;
  margin: 0 5px;
  border-width: 0;
`;

export const ModalCloseBtn = styled.button`
  font-size: 0.8em;
  float: right;
  border: none;
  background-color: transparent;
`;

ModalCloseBtn.defaultProps = {
  children: ['x'],
};

export const ModalHeader = styled.div`
  background: ${p => p.theme.colors.karashi};
  border-radius: 5px 5px 0 0;
  font-size: 1.6em;
  padding: 10px 20px;
`;

export const ModalBody = styled.div`
  padding: 10px 20px;
`;

export const ModalFooter = styled.div`
  border-top: 2px solid ${p => p.theme.colors.karashi};
  padding: 5px 10px;
  text-align: right;
`;
