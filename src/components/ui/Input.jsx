import React from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";

export const Input = React.forwardRef(({ label, icon, error, ...props }, ref) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputWrapper $hasError={!!error}>
        {icon && <Icon icon={icon} className="input-icon" />}
        <StyledInput ref={ref} $hasIcon={!!icon} $hasError={!!error} {...props} />
      </InputWrapper>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
});

const Container = styled.div`
  display: flex; flex-direction: column; gap: 6px; margin-bottom: 15px; width: 100%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colorSubtitle};
`;

const InputWrapper = styled.div`
  position: relative; display: flex; align-items: center;
  
  .input-icon {
    position: absolute; left: 12px;
    font-size: 1.2rem;
    color: ${({ theme, $hasError }) => $hasError ? theme.colorError : theme.colorSubtitle};
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-left: ${props => props.$hasIcon ? '38px' : '10px'};
  
  border-radius: 6px;
  border: 1px solid ${({ theme, $hasError }) => $hasError ? theme.colorError : theme.bg2};
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  
  font-family: inherit; font-size: 1rem;
  outline: none;
  
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: #BDBDBD;
  }
`;

const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.colorError}; font-size: 0.8rem; font-weight: 600;
`;