import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.bgcards};
  color: ${({ theme }) => theme.text};
  
  border-radius: 8px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.bg2}; 
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;