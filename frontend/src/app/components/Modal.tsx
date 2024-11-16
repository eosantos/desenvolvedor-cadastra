import styled from 'styled-components';

interface ModalProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (max-width: 768px) {
    top: 0;
    padding: 20px 0;
    overflow-y: auto;
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #000;
  border: none;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ModalButton = styled.button`
  background-color: #fb953e;
  color: #fff;
  border: none;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
  margin-top: 10px;
  text-align: center;

  &:hover {
    background-color: #e77a2b;
  }
`;

export { ModalOverlay, ModalContent, ModalTitle, CloseButton, ModalButton };
