'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect';
import Filters from '../components/Filters';
import ProductsGrid from '../components/ProductsGrid';
import Footer from '../components/Footer';

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
  flex-direction: column; /* Adicionado para organizar o título e o conteúdo verticalmente */
  gap: 30px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px; /* Espaçamento entre a barra superior e os filtros/grid */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const FiltersAndGridContainer = styled.div`
  display: flex;
  gap: 30px; /* Espaçamento entre filtros e grid */
`;

const FilterContainer = styled.div`
  width: 170px; /* Largura fixa para os filtros */
`;

const ProductsContainer = styled.div`
  flex: 1; /* Faz o grid de produtos ocupar o restante do espaço */
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Mais recentes', 'Menor preço', 'Maior preço'];

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <HomeContainer>
      <Header />
      <Content>
        {/* Barra superior com título e seletor */}
        <TopBar>
          <Title>Blusas</Title>
          <CustomSelect
            options={options}
            selectedOption={selectedOption}
            onSelect={handleSelectChange}
          />
        </TopBar>
        <Separator />
        {/* Container principal com filtros e grid */}
        <FiltersAndGridContainer>
          <FilterContainer>
            <Filters />
          </FilterContainer>
          <ProductsContainer>
            <ProductsGrid />
          </ProductsContainer>
        </FiltersAndGridContainer>
      </Content>
      <Footer />
    </HomeContainer>
  );
};

export default Home;
