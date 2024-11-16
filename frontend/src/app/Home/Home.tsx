'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductsGrid from '../components/ProductsGrid';
import Footer from '../components/Footer';
import { ModalOverlay, ModalContent, ModalTitle, CloseButton, ModalButton } from '../components/Modal';
import CustomSelect from '../components/CustomSelect';

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
  gap: 30px;

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
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
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
    gap: 10px;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 10px;
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
  background-color: #fb953e;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  width: 48%;
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
          <CloseButton onClick={() => setIsMobileFiltersOpen(false)}>X</CloseButton>
          <ModalTitle>Filtros</ModalTitle>
          <Filters onFilterChange={handleFilterChange} />
          <ModalButton onClick={() => setIsMobileFiltersOpen(false)}>Aplicar</ModalButton>
          <ModalButton onClick={() => setIsMobileFiltersOpen(false)}>Limpar</ModalButton>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay $isOpen={isMobileOrderOpen}>
        <ModalContent>
          <CloseButton onClick={() => setIsMobileOrderOpen(false)}>X</CloseButton>
          <ModalTitle>Ordenar</ModalTitle>
          <CustomSelect
            options={['Mais recentes', 'Menor preço', 'Maior preço']}
            selectedOption={selectedOption}
            onSelect={handleSelectChange}
          />
          <ModalButton onClick={() => setIsMobileOrderOpen(false)}>Aplicar</ModalButton>
        </ModalContent>
      </ModalOverlay>
    </HomeContainer>
  );
};

export default Home;
