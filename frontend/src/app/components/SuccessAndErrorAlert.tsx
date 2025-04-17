'use client'

import styled from 'styled-components';
import { Colors } from '../utils/Colors';

const Container = styled.div<{success?: boolean}>`
  margin-top: 16px;
  padding: 12px 16px;
  background-color: ${({ success }) => (success ? Colors.background.success : Colors.background.danger)};
  color: ${({ success }) => (success ? Colors.text.success : Colors.text.critical)};
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

type SuccessAndErrorAlertProps = {
  message: string;
  success: boolean;
}

export function SuccessAndErrorAlert(props: SuccessAndErrorAlertProps) {
  return (
    <Container
      success={props.success}
    >
      {props.message}
    </Container>

  );
}