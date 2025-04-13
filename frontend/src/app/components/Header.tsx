'use client'
import styled from 'styled-components'
import { Colors } from '../utils/Colors'

const MainContainer = styled.div`
  display: grid;
  width: 100%;
  grid-area: header;
  border-bottom: 1px solid ${Colors.border.default};
`

const HeaderContainer = styled.div`
  grid-column: 2 / span 10;
  padding: 12px;
`

export function Header() {
  return (
    <MainContainer>
      <HeaderContainer>
        <h1>Forms</h1>
      </HeaderContainer>
    </MainContainer>
  )
}
