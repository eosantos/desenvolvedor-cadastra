import styled from 'styled-components';

interface ModalProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1666666;
  justify-content: center;
  align-items: center;
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
    padding: 20px;
    overflow-y: auto;
  }
`;

const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 100;
  margin-bottom: 20px;
  padding-bottom: 20px;
  text-align: left;
  color: #666666;
  border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #666666;
  border: none;
  font-size: 28px;
  font-weight: 100;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const ModalButton = styled.button`
  background-color: #fb953e;
  color: #fff;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  flex: 1;
  text-align: center;

  &:hover {
    background-color: #e77a2b;
  }
`;

const ModalButtonClear = styled.button`
  background-color: transparent;
  color: #666666;
  border: 1px solid #666666;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  flex: 1;
  text-align: center;

  &:hover {
    background-color: #e77a2b;
  }
`;

export { ModalOverlay, ModalContent, ModalTitle, CloseButton, ModalButton, ModalButtonContainer, ModalButtonClear };
