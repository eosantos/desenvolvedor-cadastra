'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Product {
  id: string;
  name: string;
  price: number;
  parcelamento: number[];
  color: string;
  image: string;
  size: string[];
  date: string;
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 65px;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;

  & > div {
    flex: 1 1 calc(33.333% - 20px);
    max-width: 195px;
  }

  @media (max-width: 768px) {
    & > div {
      flex: 1 1 calc(50% - 15px);
      max-width: 130px;
      }
      
    gap: 0;
    justify-content: center;
    padding: 0;
  }
`;


const ProductCard = styled.div`
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 150px;
  height: 425px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 130px;
    height: 380px;
    padding: 10px;
    margin: 0 auto;

    button {
      margin-top: 10px;
      max-width: 152px;
      gap: 5px;
    }
  }

  img {
    width: 100%;
    max-width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 4px;
  }

  h3 {
    font-size: 14px;
    font-weight: 100;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    font-size: 0.8rem;
    color: #666;
    margin: 0;
    text-align: center;
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
    max-width: 195px;
  }

  @media (max-width: 768px) {
    button {
      max-width: 150px;
    }
  }
`;

const ProductInfo = styled.div`
  margin-top: 10px;

  h3 {
    color: #000;
    font-wigth: 100;
    margin: 10px 0;
  }
  p {
    font-size: 1rem;
    color: #000;
  }
`;

const TextPrice = styled.p `
  font-size: 1.2rem;
  color: #000;
  margin: 15px 0 5px 0;
  font-weight: bold;
}`


const BuyButton = styled.button`
  background-color: #000;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  width: 195px;
  font-weigth: bold;


  &:hover {
    background-color: #d77b2b;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 20px;
  }
`;

const LoadMoreButton = styled.button`
  background-color: #fb953e;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 165px;
  margin: 20px auto 60px auto; /* Centraliza no eixo horizontal */
  display: block; /* Necessário para funcionar com margin auto */

  &:hover {
    background-color: #d77b2b;
  }
`;

const NoProductsMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 20px;
`;

const ProductsGrid: React.FC<{ order: string; filters: { colors: string[]; sizes: string[]; prices: string[] } }> = ({
  order,
  filters,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleProductsVisibility = () => {
    if (visibleCount >= products.length) {
      setVisibleCount(9); // Reduz para 9 produtos
    } else {
      setVisibleCount((prevCount) => prevCount + 9); // Aumenta a quantidade visível
    }
  };

  const parsePriceRange = (priceRange: string) => {
    const match = priceRange.match(/de R\$(\d+) até R\$(\d+)/);
    if (match) {
      return {
        min: parseInt(match[1]),
        max: parseInt(match[2]),
      };
    }
    if (priceRange === 'acima de R$500') {
      return { min: 500, max: Infinity };
    }
    return { min: 0, max: 0 };
  };

  const filteredProducts = products.filter((product) => {
    const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.color);
    const matchesSize = filters.sizes.length === 0 || filters.sizes.some(size => product.size.includes(size));
    const matchesPrice = filters.prices.length === 0 || filters.prices.some(priceRange => {
      const { min, max } = parsePriceRange(priceRange);
      return product.price >= min && product.price <= max;
    });
    return matchesColor && matchesSize && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (order === 'Mais recentes') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (order === 'Menor preço') return a.price - b.price;
    if (order === 'Maior preço') return b.price - a.price;
    return 0;
  });

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <>
      {sortedProducts.length === 0 ? (
        <NoProductsMessage>Nenhum produto encontrado para o filtro selecionado :(</NoProductsMessage>
      ) : (
        <div>
          <GridContainer>
            {sortedProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <ProductInfo>
                  <h3>{product.name}</h3>
                  <TextPrice>R$ {product.price.toFixed(2)}</TextPrice>
                  <p>
                    até {product.parcelamento[0]}x de R$ {product.parcelamento[1].toFixed(2)}
                  </p>
                  <BuyButton>COMPRAR</BuyButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </GridContainer>
          <LoadMoreButton onClick={toggleProductsVisibility}>
            {visibleCount >= sortedProducts.length ? 'VER MENOS' : 'CARREGAR MAIS'}
          </LoadMoreButton>
        </div>
      )}
    </>
  );
};


export default ProductsGrid;
