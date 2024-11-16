'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect';
import Filters from '../components/Filters';
import ProductsGrid from '../components/ProductsGrid';
import Footer from '../components/Footer';

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
`;

const Content = styled.main`
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
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
`;

const FilterContainer = styled.div`
  width: 170px;
`;

const ProductsContainer = styled.div`
  flex: 1;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [filters, setFilters] = useState<FiltersState>({
    colors: [],
    sizes: [],
    prices: [],
  });

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
        {/* Barra superior com título e seletor */}
        <TopBar>
          <Title>Blusas</Title>
          <CustomSelect
            options={['Ordenar por:', ...options]}
            selectedOption={selectedOption}
            onSelect={handleSelectChange}
          />
        </TopBar>
        <Separator />
        {/* Container principal com filtros e grid */}
        <FiltersAndGridContainer>
          <FilterContainer>
            <Filters onFilterChange={handleFilterChange} />
          </FilterContainer>
          <ProductsContainer>
            <ProductsGrid order={selectedOption} filters={filters} />
          </ProductsContainer>
        </FiltersAndGridContainer>
      </Content>
      <Footer />
    </HomeContainer>
  );
};

export default Home;
