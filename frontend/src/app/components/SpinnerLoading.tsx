'use client'

import styled from 'styled-components';
import { Colors } from '../utils/Colors';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${Colors.button.default};
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

type SpinnerLoadingProps = {
  isLoading: boolean;
}

export function SpinnerLoading(props: SpinnerLoadingProps) {
  if (!props.isLoading) {
    return null;
  }

  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
}