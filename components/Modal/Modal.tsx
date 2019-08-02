import React, { useRef, useEffect } from 'react';
import styled from 'theme/styled';
import dynamic from 'next/dynamic';

import { ModalComponentsProps, ModalProps } from './types';
import { PortalProps } from 'react-portal';

const Portal = dynamic<PortalProps>(
  () => import('react-portal').then(mod => mod.Portal),
  {
    ssr: false,
  },
);

export const Shader = styled.div<ModalComponentsProps>`
  z-index: 500;
  display: ${p => (p.show ? 'flex' : 'none')};
  opacity: ${p => (p.show ? 1 : 0)};
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.6) 100%
  );
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const ModalContainer = styled.div<ModalComponentsProps>`
  position: fixed;
  z-index: 600;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  display: ${p => (p.show ? 'flex' : 'none')};
  justify-content: center;
  overflow-y: auto;
  align-items: flex-start;
  padding: '50px 0';
`;

export const Container = styled.div<ModalComponentsProps>`
  opacity: ${p => (p.show ? 1 : 0)};
  overflow-y: auto;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  background: ${p => p.theme.colors.orange[4]};
  border-radius: 5px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3em;
  width: 80%;
  ${p => p.theme.mediaQueries.small} {
    width: 98%;
  }
  ${p => p.theme.mediaQueries.medium} {
    width: 92%;
  }
  ${p => p.theme.mediaQueries.large} {
    width: 86%;
  }
`;

const Modal = ({ show, children, closefn }: ModalProps) => {
  const shaderRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!shaderRef.current || !modalRef.current) return;
      if (
        shaderRef.current.contains(e.target as Node | null) &&
        !modalRef.current.contains(e.target as Node | null)
      ) {
        if (closefn) closefn();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <Portal>
      <React.Fragment>
        <Shader className="modal-shade" show={show} />
        <ModalContainer ref={shaderRef} className="modal-container" show={show}>
          <Container ref={modalRef} className="modal" show={show}>
            {children}
          </Container>
        </ModalContainer>
      </React.Fragment>
    </Portal>
  );
};

export default Modal;
