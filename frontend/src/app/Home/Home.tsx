'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductsGrid from '../components/ProductsGrid';
import Footer from '../components/Footer';
import CustomSelect from '../components/CustomSelect';
import { ModalOverlay, ModalContent, ModalTitle, CloseButton, ModalButton, ModalButtonContainer } from '../components/Modal';
import Accordion from '../components/Accordion';

interface ModalProps {
  isMobileFiltersOpen: boolean;
  setIsMobileFiltersOpen: (isOpen: boolean) => void;
  handleFilterChange: (filters: any) => void;
}

interface FiltersState {
  colors: string[];
  sizes: string[];
  prices: string[];
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  color: #000;
  min-height: 100vh;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const Content = styled.main`
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 20px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: block;
    align-self: center;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 100;
  color: #333333;
  margin-left: 1rem;
`;

const FiltersAndGridContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FilterContainer = styled.div`
  width: 170px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductsContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MobileButtonsContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const DesktopOnly = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;    
  }
`;

const MobileButton = styled.button`
  background-color: #fff;
  color: #666666;
  border: 1px solid #666666;
  cursor: pointer;
  font-size: 24px;
  width: 48%;
  padding: 5px
`;

const ProductsGridMobileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

const LoadMoreButton = styled.button`
  background-color: #fb953e;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  width: 100%;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  color: #666666;
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

const ProductsGridDesktopContainer = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Ordenar por:');
  const [filters, setFilters] = useState<FiltersState>({
    colors: [],
    sizes: [],
    prices: [],
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);
  const [isMobileOrderOpen, setIsMobileOrderOpen] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [showAllColors, setShowAllColors] = useState(false);

  const handleSizeSelect = (size: string) => {
    const updatedSize = selectedSize === size ? null : size;
    setSelectedSize(updatedSize);
  
    setFilters((prevFilters) => ({
        ...prevFilters,
        sizes: updatedSize ? [updatedSize] : [],
      }));
    };

    const handlePriceChange = (price: string) => {
      const updatedPrices = selectedPrices.includes(price)
        ? selectedPrices.filter((item) => item !== price)
        : [...selectedPrices, price];
      setSelectedPrices(updatedPrices);
    
      setFilters((prevFilters) => ({
        ...prevFilters,
        prices: updatedPrices,
      }));
    };

    const toggleColors = () => {
      setShowAllColors(!showAllColors);
    };

    const handleColorChange = (color: string) => {
      const updatedColors = selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color];
      setSelectedColors(updatedColors);
    
      setFilters((prevFilters) => ({
        ...prevFilters,
        colors: updatedColors,
      }));
    };

    const handleClearFilters = () => {
      setFilters({
        colors: [],
        sizes: [],
        prices: [],
      });
      setSelectedColors([]);
      setSelectedSize(null);
      setSelectedPrices([]);
    };

    const options = ['Mais recentes', 'Menor preço', 'Maior preço'];

    const handleSelectChange = (value: string) => {
      setSelectedOption(value);
    };

  const handleFilterChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
  };

  return (
    <HomeContainer>
      <Header />
      <Content>
        <TopBar>
          <Title>Blusas</Title>
          <DesktopOnly>
            <CustomSelect
              options={options}
              selectedOption={selectedOption}
              onSelect={handleSelectChange}
            />
          </DesktopOnly>
        </TopBar>

        <MobileButtonsContainer>
          <MobileButton onClick={() => setIsMobileFiltersOpen(true)}>Filtrar</MobileButton>
          <MobileButton onClick={() => setIsMobileOrderOpen(true)}>Ordenar</MobileButton>
        </MobileButtonsContainer>

        <ProductsGridMobileContainer>
          <ProductsGrid order={selectedOption} filters={filters} />
        </ProductsGridMobileContainer>

        <ProductsGridDesktopContainer>
          <FiltersAndGridContainer>
            <FilterContainer>
              <Filters onFilterChange={handleFilterChange} />
            </FilterContainer>
            <ProductsContainer>
              <ProductsGrid order={selectedOption} filters={filters} />
            </ProductsContainer>
          </FiltersAndGridContainer>
        </ProductsGridDesktopContainer>
      </Content>
      <Footer />

      <ModalOverlay $isOpen={isMobileFiltersOpen}>
        <ModalContent>
          <CloseButton onClick={() => setIsMobileFiltersOpen(false)}>x</CloseButton>
          <ModalTitle>FILTRAR</ModalTitle>

          <Accordion title="CORES">
            <FilterSection>
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
                {showAllColors ? 'Ver menos CORES ˄' : 'Ver todas as CORES v'}
              </LinkText>
            </FilterSection>
          </Accordion>

          <Accordion title="TAMANHOS">
            <FilterSection>
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
          </Accordion>

          <Accordion title="FAIXA DE PREÇO">
            <FilterSection>
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
          </Accordion>

          <ModalButtonContainer>
            <ModalButton onClick={() => setIsMobileFiltersOpen(false)}>Aplicar</ModalButton>
            <ModalButton onClick={handleClearFilters}>Limpar</ModalButton>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
    </HomeContainer>
  );
};

export default Home;
