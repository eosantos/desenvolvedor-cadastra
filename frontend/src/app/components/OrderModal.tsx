// components/OrderModal.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

const OrderModalContainer = styled.div`
  position: relative;
  display: inline-block;

  .order-button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;

    &:focus {
      border-color: #fb953e;
      outline: none;
    }

    &:after {
      content: '▼';
      font-size: 12px;
      color: #666;
      margin-left: 8px;
    }
  }

  .order-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 1;
  }

  &.open .order-options {
    display: block;
  }

  .order-option {
    padding: 8px 12px;
    background-color: #fff;
    color: #666;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #fb953e;
      color: white;
    }

    &:first-child {
      color: #999;
    }
  }
`;

interface OrderModalProps {
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <OrderModalContainer className={isOpen ? 'open' : ''}>
      <div className="order-button" onClick={toggleModal}>
        {selectedOption || 'Ordenar por:'}
      </div>
      <div className="order-options">
        {options.map((option, index) => (
          <div
            key={index}
            className="order-option"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </OrderModalContainer>
  );
};

export default OrderModal;
