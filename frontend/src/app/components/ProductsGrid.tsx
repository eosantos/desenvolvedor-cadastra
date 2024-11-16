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

const ProductsGrid: React.FC = () => {
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
      setVisibleCount(9); // Volta para os 9 primeiros
    } else {
      setVisibleCount((prevCount) => prevCount + 9);
    }
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <>
      <GridContainer>
        {products.slice(0, visibleCount).map((product) => (
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
      {products.length > 9 && (
        <LoadMoreButton onClick={loadMoreProducts}>
          {visibleCount >= products.length ? 'VER MENOS' : 'CARREGAR MAIS'}
        </LoadMoreButton>
      )}
    </>
  );
};

export default ProductsGrid;
