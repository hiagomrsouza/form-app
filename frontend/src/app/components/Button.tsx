'use client'

import styled from 'styled-components';
import { Colors } from '../utils/Colors';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CustomButton = styled.button<{ primary?: boolean }>`
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: ${({ primary: isPrimary }) => (isPrimary ? Colors.button.default : Colors.button.basic)};
  border: none;
  cursor: pointer;
  color: ${({ primary: isPrimary }) => (isPrimary ? Colors.text.white : Colors.text.default)};
  border-radius: 4px;

  &:hover {
    background-color: ${({ primary: isPrimary }) => (isPrimary ? Colors.button.hover : Colors.button.basicHover)};
  }
`;

type ButtonProps = {
  primary?: boolean;
  label: string;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <CustomButton 
      primary={props.primary} 
      onClick={props.onClick}>
        {props.label}
    </CustomButton>
  );
}
