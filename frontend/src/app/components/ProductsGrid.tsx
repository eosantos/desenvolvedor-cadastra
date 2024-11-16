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
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;
  margin: 20px 50px;
  max-width: 900px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  text-align: center;
`;

const ProductInfo = styled.div`
  padding: 16px;

  h3 {
    font-size: 18px;
    color: #000;
    margin-bottom: 15px;
    font-weight: 100;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 8px 0 0 0;
  }

  span {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

const BuyButton = styled.button`
  margin-top: 12px;
  height: 33px;
  width: 100%;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  width: 195px;

  &:hover {
    background-color: #e77a2b;
  }
`;

const LoadMoreButton = styled.button`
  margin: 70px auto 15px auto;
  display: block;
  width: 175px;
  height: 35px;
  background-color: #fb953e;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #000;

  &:hover {
    background-color: #e77a2b;
  }
`;

const NoProductsMessage = styled.p`
  text-align: center;
  font-size: 18px;
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

  const loadMoreProducts = () => {
    if (visibleCount >= products.length) {
      setVisibleCount(9);
    } else {
      setVisibleCount((prevCount) => prevCount + 9);
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
        <GridContainer>
          {sortedProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '195px', height: 'auto' }}
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
      )}
      {sortedProducts.length > 9 && (
        <LoadMoreButton onClick={loadMoreProducts}>
          {visibleCount >= sortedProducts.length ? 'VER MENOS' : 'CARREGAR MAIS'}
        </LoadMoreButton>
      )}
    </>
  );
};

export default ProductsGrid;
