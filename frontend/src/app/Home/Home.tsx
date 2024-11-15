'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect'; // Importando o novo componente de filtro de ordenação
import Filters from '../components/Filters'; // Importando o componente Filters (do filtro lateral)

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  color: #000;
  min-height: 100vh;
`;

const Content = styled.main`
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 30px; /* Espaçamento entre filtros e conteúdo principal */
`;

const TitleAndFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap; /* Garante que os filtros e o título se adaptem responsivamente */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  flex: 1;
`;

const FilterContainer = styled.div`
  width: 170px; /* Largura máxima para o filtro lateral */
  margin-top: 60px; /* Distância de 60px abaixo do título */
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

          

        <div style={{ flex: 1 }}>
          <TitleAndFilter>
            <Title>Blusas</Title>
            <CustomSelect
              options={options}
              selectedOption={selectedOption}
              onSelect={handleSelectChange}
            />
          </TitleAndFilter>
          <Separator />
        <Filters />
        </div>
      </Content>
    </HomeContainer>
  );
};

export default Home;
