import React from 'react'
import styled from 'styled-components'

const Unfound = () => {
  return (
    <Container>
      404 | This page could not be found.
    </Container>
  )
}


const Container = styled.p`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
`

export default Unfound
