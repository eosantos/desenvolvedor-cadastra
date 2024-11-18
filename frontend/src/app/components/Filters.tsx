import React, { useState } from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 235px;
  padding: 20px;
  background-color: #fff;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterTitle = styled.h3`
  font-size: 16px;
  color: #666666;
  margin-bottom: 15px;
  font-weight: 100;
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
    background-color: #fff;
    position: relative;
    cursor: pointer;

    &:checked {
      background-color: #fb953e;
      box-shadow: inset 0 0 0 2px #fff;
    }

    &:checked::after {
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
  width: 50px;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid ${(props) => (props.selected ? '#fb953e' : '#ccc')};
  border-radius: 4px;
  color: ${(props) => (props.selected ? '#000' : '#666')};
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #fb953e;
    color: #000;
    font-weigth: bold;
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
    background-color: #fff;
    position: relative;
    cursor: pointer;

    &:checked {
      background-color: #fb953e;
      box-shadow: inset 0 0 0 2px #fff;
    }

    &:checked::after {
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

const Filters: React.FC<{ onFilterChange: (newFilters: { colors: string[]; sizes: string[]; prices: string[] }) => void }> = ({ onFilterChange }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [showAllColors, setShowAllColors] = useState(false);

  const handleColorChange = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((item) => item !== color)
      : [...selectedColors, color];
    setSelectedColors(updatedColors);
    onFilterChange({ colors: updatedColors, sizes: selectedSize ? [selectedSize] : [], prices: selectedPrices });
  };

  const handleSizeSelect = (size: string) => {
    const updatedSize = selectedSize === size ? null : size;
    setSelectedSize(updatedSize);
    onFilterChange({ colors: selectedColors, sizes: updatedSize ? [updatedSize] : [], prices: selectedPrices });
  };

  const handlePriceChange = (price: string) => {
    const updatedPrices = selectedPrices.includes(price)
      ? selectedPrices.filter((item) => item !== price)
      : [...selectedPrices, price];
    setSelectedPrices(updatedPrices);
    onFilterChange({ colors: selectedColors, sizes: selectedSize ? [selectedSize] : [], prices: updatedPrices });
  };

  const toggleColors = () => {
    setShowAllColors(!showAllColors);
  };

  return (
    <FiltersContainer>
      {/* Filtro de Cores */}
      <FilterSection>
        <FilterTitle>CORES</FilterTitle>
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
        <FilterTitle>TAMANHOS</FilterTitle>
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
        <FilterTitle>FAIXA DE PREÇO</FilterTitle>
        <PriceCheckboxContainer>
          {['de R$0 até R$50', 'de R$51 até R$151', 'de R$151 até R$300', 'de R$301 até R$500', 'acima de R$500'].map((price) => (
            <PriceLabel key={price}>
              <input
                type="checkbox"
                checked={selectedPrices.includes(price)}
                onChange={() => handlePriceChange(price)}
              />
              {price}
            </PriceLabel>
          ))}
        </PriceCheckboxContainer>
      </FilterSection>
    </FiltersContainer>
  );
};

export default Filters;
