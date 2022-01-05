// Dependencies
import React from 'react'
import styled from 'styled-components'
// Components
import { HeroTitle } from '../styles/components'
// Utilities
import { QUERIES } from '../utils/constants'
import { reformedTitle } from '../utils/helpers'

// ------------------------------
// Hero component
// ------------------------------
const Hero = ({ title }) => {
  return (
    <HeroContainer>
      <HeroTitle style={{ marginBottom: 0 }}>
        {reformedTitle(title).firstWord}<br />
        {reformedTitle(title).restTitle}<span>.</span>
      </HeroTitle>
    </HeroContainer>
  )
}

// ------------------------------
// Styles
// ------------------------------
const HeroContainer = styled.div`
  display: grid;
  gap: clamp(2rem, 10vw, 4rem);
  grid-template-columns: 1fr;
  @media ${QUERIES.laptopAndUp} {
    padding: 0;
    justify-content: center;
  }
`

export default Hero
