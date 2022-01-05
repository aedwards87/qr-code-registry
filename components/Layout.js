// Dependencies
import React from 'react'
import styled from 'styled-components'
// Custom components
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </Container>
  )
}

const Main = styled.main`
  /* 
    Opening the nav menu resorting in some
    fixed items being pushed down as a direct
    cause of the nav bar. These styles help
    prevent that.
  */
  margin-top: calc(var(--navHeight) * -1);
  padding-top: var(--navHeight);
`

const Container = styled.div`
  display: grid;
  margin: auto;
  height: 100%;
  /* grid-template-columns: 
    1fr 
    min(var(--desktopInnerMaxWidth), calc(100% - 14vw))
    1fr;
  grid-template-rows: auto 1fr auto;
  > * {
    grid-column: 2;
  } */
`

export default Layout
