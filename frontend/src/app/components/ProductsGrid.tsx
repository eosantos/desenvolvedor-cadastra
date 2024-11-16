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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 100%;
  }
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  margin-top: 10px;

  h3 {
    font-size: 1rem;
    color: #333;
    margin: 10px 0;
  }

  span {
    font-size: 1.2rem;
    color: #fb953e;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

const BuyButton = styled.button`
  background-color: #fb953e;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;

  &:hover {
    background-color: #d77b2b;
  }
`;

const LoadMoreButton = styled.button`
  background-color: #fb953e;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 165px;
  margin-top: 20px;

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
                  <span>R$ {product.price.toFixed(2)}</span>
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
