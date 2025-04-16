'use client'
import styled from 'styled-components'
import { Colors } from '../utils/Colors'

const HeaderContainer = styled.div`
  display: grid;
  width: 100%;
  grid-area: header;
  grid-template-columns: repeat(12, 1fr);
  border-bottom: 1px solid ${Colors.border.default};
`

const Section = styled.div`
  grid-column: 2 / span 10;
  padding: 12px;
`

export function Header() {
  return (
    <HeaderContainer>
      <Section>
        <h1>Forms</h1>
      </Section>
    </HeaderContainer>
  )
}
