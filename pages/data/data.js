// Dependencies
import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import ScrollContainer from 'react-indiana-drag-scroll'
// Components
import { SubmitButton } from '../../styles/components'
import ToolBar from '../../components/ToolBar'
import Table from '../../components/Table'
import Hero from '../../components/Hero'
import DownloadCSV from '../../components/DownloadCSV'
// Utilities
import { QUERIES } from '../../utils/constants'
import { useFirestore } from '../../hooks'
// Assets
import { DeleteSVG } from '../../assets/svg'

// ------------------------------
// Data component
// ------------------------------
const Data = ({ title }) => {
  const { handleDeleteAll } = useFirestore()
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToolBar />
      <InnerLayout>
        <Hero title={title} />
      </InnerLayout>
      <InnerLayout as={ScrollContainer} className="scroll-container">
        <Table />
      </InnerLayout>
      <DeleteAllButton onClick={handleDeleteAll}>
        <DeleteSVG color="White" />
        DELETE ALL
      </DeleteAllButton>
    </Container>
  )
}

// ------------------------------
// Styles
// ------------------------------
const Container = styled.section`
  --gap: ${20 / 16}rem;
  padding: min(8rem,25vw) 0;
  display: grid;
  grid-auto-rows: auto 1fr;
  row-gap: min(3.25rem,10vw);
  justify-items: center;
  @media ${QUERIES.tabletAndUp} {
    padding-top: 8rem;
  }
  @media (hover: none) and (pointer: coarse) {
    padding-top: 4rem;
  }
`

const InnerLayout = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 
    1fr 
    min(1064px, calc(100% - 14vw))
    1fr;
  grid-template-rows: auto 1fr;
  > * {
    grid-column: 2;
  }
  /*
    Scrollbar className is used in globalstyles
    to apply custom styles to the scrollbar to
    match those applied to the usual scrollbar.
    Makes sense to reuse it here to add the 
    styling below instead of passing a prop down.
  */
  &.scroll-container {
    overflow-x: auto;
    cursor: move;
  }
`

const DeleteAllButton = styled(SubmitButton)`
  background: hsl(var(--colorError));
  display: grid;
  grid-template-columns: auto auto;
  place-items: center;
  justify-items: start;
  gap: 1rem;
  > svg {
    justify-self: end;
  }
  &:focus-visible,
  &:hover {
    border: 2px solid hsl(var(--colorWhite));
    box-shadow: 0 0 0 4px hsla(var(--colorError));
  }
`

export default Data
