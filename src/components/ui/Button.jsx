import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px; 
  font-weight: 600;    
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  
  transition: background-color 0.2s;

  ${props => (!props.$variant || props.$variant === 'primary') && css`
    background-color: ${({ theme }) => theme.primary};
    color: #FFFFFF;
    
    &:hover {
      background-color: #1565C0; 
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background-color: ${({ theme }) => theme.secondary};
    color: #FFFFFF;

    &:hover {
      background-color: #EF6C00;
    }
  `}

  ${props => props.$variant === 'success' && css`
    background-color: ${({ theme }) => theme.colorSuccess};
    color: #FFFFFF;

    &:hover {
      background-color: #2E7D32;
    }
  `}

  ${props => props.$variant === 'danger' && css`
    background-color: ${({ theme }) => theme.colorError};
    color: #FFFFFF;

    &:hover {
      background-color: #C62828;
    }
  `}

  ${props => props.$variant === 'outline' && css`
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.colorSubtitle};
    
    &:hover {
      border-color: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.text};
      background-color: ${({ theme }) => theme.bgtotal};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;