import React from "react"
import styled, { css } from "styled-components"

export function Title({ children, className, as, ...props }) {

  return (
    <Container
      as={as}
      className={className}
      {...props}
    >
      {children}
    </Container>
  )
}

// Base title styling
export const Container = styled.h1`
  
`

// Hero styling
export const HeroTitle = styled(Title)`
  font-size: clamp(var(--fontSize900), 14vw, var(--fontSizeHeroXL));
  font-weight: var(--fontWeightBold);
  margin-bottom: min(${52 / 16}rem, 10vw);
  > span { color: hsl(var(--colorModeDot)) }
`

// Hero styling
export const ScanTitle = styled(Title)`
  font-size: clamp(var(--fontSize400), 14vw, var(--fontSize700));
  font-weight: var(--fontWeightMedium);
  color: hsl(var(--colorModeDot));
  margin-bottom: 1rem;
  ${props => props.scanTitle === 'Successful' ? css`
    color: hsl(var(--colorSuccess));
  ` : props.scanTitle === 'Unsuccessful' ? css`
    color: hsl(var(--colorError));
  ` : null
  }
`