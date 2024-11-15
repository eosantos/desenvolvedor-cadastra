'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 235px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  color: #000;
  margin-bottom: 10px;
`;

const ColorCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ColorLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;

  input {
    margin-right: 8px;
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #666;
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    cursor: pointer;

    &:checked {
      background-color: #fb953e;
      border-color: #fb953e;
    }

    &:checked::after {
      content: '✔';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

const LinkText = styled.a`
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }
`;

const SizeOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SizeButton = styled.button<{ selected: boolean }>`
  width: 50px; /* Tamanho fixo */
  height: 40px; /* Tamanho fixo */
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#fb953e' : '#f1f1f1')};
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${(props) => (props.selected ? '#fff' : '#666')};
  cursor: pointer;

  &:hover {
    background-color: #fb953e;
    color: white;
  }
`;

const PriceCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;

  input {
    margin-right: 8px;
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #666;
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    cursor: pointer;

    &:checked {
      background-color: #fb953e;
      border-color: #fb953e;
    }

    &:checked::after {
      content: '✔';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

const Filters: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [showAllColors, setShowAllColors] = useState(false);

  const handleColorChange = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((item) => item !== color)
        : [...prevColors, color]
    );
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrices((prevPrices) =>
      prevPrices.includes(price)
        ? prevPrices.filter((item) => item !== price)
        : [...prevPrices, price]
    );
  };

  const toggleColors = () => {
    setShowAllColors(!showAllColors);
  };

  return (
    <FiltersContainer>
      {/* Filtro de Cores */}
      <FilterSection>
        <FilterTitle>Cores</FilterTitle>
        <ColorCheckboxContainer>
          {['Amarelo', 'Azul', 'Branco', 'Cinza', 'Laranja'].map((color) => (
            <ColorLabel key={color}>
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              {color}
            </ColorLabel>
          ))}
          {showAllColors && (
            <ColorCheckboxContainer>
              {['Verde', 'Vermelho', 'Preto', 'Rosa', 'Vinho'].map((color) => (
                <ColorLabel key={color}>
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  {color}
                </ColorLabel>
              ))}
            </ColorCheckboxContainer>
          )}
        </ColorCheckboxContainer>
        <LinkText onClick={toggleColors}>
          {showAllColors ? 'Ver menos cores ˄' : 'Ver todas as cores v'}
        </LinkText>
      </FilterSection>

      {/* Filtro de Tamanhos */}
      <FilterSection>
        <FilterTitle>Tamanhos</FilterTitle>
        <SizeOptionsContainer>
          {['P', 'M', 'G', 'GG', 'U', '36', '38', '40', '42', '44', '46'].map((size) => (
            <SizeButton
              key={size}
              selected={selectedSize === size}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </SizeButton>
          ))}
        </SizeOptionsContainer>
      </FilterSection>

      {/* Filtro de Faixa de Preço */}
      <FilterSection>
        <FilterTitle>Faixa de Preço</FilterTitle>
        <PriceCheckboxContainer>
          {[`de R$0 até R$50`, `de R$51 até R$151`, `de R$151 até R$300`, `de R$301 até R$500`, `a partir de R$500`].map(
            (price) => (
              <PriceLabel key={price}>
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(price)}
                  onChange={() => handlePriceChange(price)}
                />
                {price}
              </PriceLabel>
            )
          )}
        </PriceCheckboxContainer>
      </FilterSection>
    </FiltersContainer>
  );
};

export default Filters;
