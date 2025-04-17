'use client'

import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import { FormEvent } from 'react';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonActive = styled.button<{ primary?: boolean }>`
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

const ButtonDisabled = styled.button`
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: ${Colors.button.disabled};
  border: ${Colors.border.default};
  cursor: pointer;
  color: ${Colors.text.default};
  border-radius: 4px;
`;

type ButtonProps = {
  primary?: boolean;
  disabled?: boolean;
  label: string;
  onClick: (e?: FormEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button(props: ButtonProps) {
  if (props.disabled) {
    return (
      <ButtonDisabled 
        onClick={props.onClick}>
          {props.label}
      </ButtonDisabled>
    );
  }

  return (
    <ButtonActive
      type={props.type || 'button'}
      disabled={props.disabled || false}
      primary={props.primary || false} 
      onClick={props.onClick}>
        {props.label}
    </ButtonActive>
  );
}
