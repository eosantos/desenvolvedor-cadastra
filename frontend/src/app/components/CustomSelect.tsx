// components/CustomSelect.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

const CustomSelectContainer = styled.div`
  position: relative;
  display: inline-block; /* Garante a exibição no desktop */

  select {
    display: none;
  }

  .custom-select {
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
  }

  .custom-options {
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

  &:hover .custom-options {
    display: block;
  }

  .custom-option {
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

  .custom-select::after {
    content: '▼';
    font-size: 12px;
    color: #666;
    margin-left: 8px;
  }

  .selected-option {
    font-weight: bold;
    color: #333;
  }
`;

interface CustomSelectProps {
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
  style?: React.CSSProperties; // Adicione esta linha para suportar a prop style
}


const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedOption, onSelect, style }) => {
  return (
    <CustomSelectContainer style={style}>
      <div className="custom-select">
        {selectedOption || 'Ordenar por:'}
      </div>
      <div className="custom-options">
        {options.map((option, index) => (
          <div
            key={index}
            className="custom-option"
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </CustomSelectContainer>
  );
};

export default CustomSelect;
