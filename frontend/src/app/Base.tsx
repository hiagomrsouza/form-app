'use client'

import styled from "styled-components";
import { IRootLayoutProps } from "./layout";
import { Header } from "./components";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'header' 'body';
  height: 100vh;
`

const Body = styled.div`
  display: grid;
  width: 100%;
  grid-area: body;
`

const BodyContainer = styled.div`
  grid-column: 2 / span 10;
  padding: 12px;
`

export default function Base(props: IRootLayoutProps) {
  return (
    <PageContainer>
      <Header />
      <Body>
        <BodyContainer>{props.children}</BodyContainer>
      </Body>
    </PageContainer>
  );
}
