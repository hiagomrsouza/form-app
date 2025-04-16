'use client'

import styled from 'styled-components';

const Container = styled.h4`
  display: flex;
  align-items: center;
  gap: 8px;
`

type BreadcrumbsProps = {
  text: string;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <Container>
      {props.text}
    </Container>
  );
}