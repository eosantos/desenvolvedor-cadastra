import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  font-size: 14px;
  font-weight: 100;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      CADASTRA: Implantação de E-commerce VTEX
    </FooterContainer>
  );
};

export default Footer;
