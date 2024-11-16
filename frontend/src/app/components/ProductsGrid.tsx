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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 50px;
  margin: 20px 30px;
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
  padding: 5px 16px;
  width: 195px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e77a2b;
  }
`;

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "195px", height: "auto" }}
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
  );
};

export default ProductsGrid;
