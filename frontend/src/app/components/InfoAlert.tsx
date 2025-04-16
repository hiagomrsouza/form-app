'use client'

import styled from 'styled-components';

const Container = styled.div`
  background-color: #e0f2fe;
  border-left: 4px solid #0ea5e9;
  padding: 12px 16px;
  color: #0c4a6e;
  font-size: 14px;
  border-radius: 4px;
`;

type InfoAlertProps = {
  message: string;
}

export function InfoAlert(props: InfoAlertProps) {
  return (
    <Container>
      {props.message}
    </Container>

  );
}