import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: auto;
`;

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <Image
        src="/assets/logoCadastra.png"
        alt="Logo da empresa"
        width={165}
        height={25}
        priority
      />
    </LogoContainer>
  );
};

export default Logo;
