'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  margin-bottom: 20px;  
`;

const AccordionHeader = styled.div`
  padding: 2px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionTitle = styled.h3`
  font-size: 16px;
  font-weight: 100;
  margin: 0;
  color: #666666;
`;

const AccordionIcon = styled.span`
  font-size: 18px;
  color: #666666;
`;

const AccordionContent = styled.div`
  padding: 16px;
  border-radius: 4px;
`;

const AccordionCheckboxWrapper = styled.div`
  margin-top: 10px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
`;

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initialOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, initialOpen = false, onChange }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggleAccordion = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onChange) onChange(newIsOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon>{isOpen ? '˄' : '˅'}</AccordionIcon>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
};

export default Accordion;
