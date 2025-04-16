'use client'
import styled from 'styled-components'
import { Colors } from '../utils/Colors'
import { useRouter } from 'next/navigation'

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

const Title = styled.h1`
  cursor: pointer;
  background: ${Colors.background.default};
`

export function Header() {
  const router = useRouter();

  const handleClickTitle = () => {
    router.push('/');
  }

  return (
    <HeaderContainer>
      <Section>
        <Title onClick={handleClickTitle}>Forms</Title>
      </Section>
    </HeaderContainer>
  )
}
