// src/app/components/Header.tsx

import styled from 'styled-components';
import { HiShoppingBag } from 'react-icons/hi';
import Logo from './Logo'; // Certifique-se de importar corretamente

const HeaderContainer = styled.header`
  width: 100%;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const ShoppingCart = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    font-size: 28px;
    color: #666;
  }
`;

const CartBadge = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  background-color: #fb953e;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo /> {/* Aqui estamos utilizando o Logo com a imagem PNG */}
        <ShoppingCart>
          <HiShoppingBag />
          <CartBadge>1</CartBadge>
        </ShoppingCart>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
