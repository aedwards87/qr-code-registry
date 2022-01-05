// Dependencies
import Head from 'next/head'
import styled from 'styled-components'
// Components
import QRCodeForm from './Form'
import QRCodeImage from './QRCodeImage'
import { HeroTitle } from '../styles/components'
// Utilities
import { QUERIES } from '../utils/constants'
import { reformedTitle } from '../utils/helpers'
import { useStateContext } from '../hooks'


// ------------------------------
// QRCodeTemplate Component
// ------------------------------
const QRCodeTemplate = ({ title = 'QR Code' }) => {
  const [inputValues] = useStateContext()
  return (
    <Frame>
      <Container>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FormDisplayContainer>
          <HeroTitle>
            {reformedTitle(title).firstWord}<br />
            {reformedTitle(title).restTitle}<span>.</span>
          </HeroTitle>
          <QRCodeForm category={reformedTitle(title).firstWord} />
        </FormDisplayContainer>
        <QRCodeDisplayContainer>
          <QRCodeImage imageData={inputValues} />
        </QRCodeDisplayContainer>
      </Container>
    </Frame>
  )
}


// ------------------------------
// Styles
// ------------------------------
const Frame = styled.div`
  display: grid;
  margin: auto;
  height: 100%;
  grid-template-columns: 
    1fr 
    min(var(--desktopInnerMaxWidth), calc(100% - 14vw))
    1fr;
  grid-template-rows: auto 1fr auto;
  > * {
    grid-column: 2;
  }
`

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 10vw, 4rem);
  align-items: start;
  padding-top: min(3.25rem,10vw);
  @media ${QUERIES.tabletAndUp} {
    justify-items: center;
    padding: 4rem 0;
  }
  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`

const FormDisplayContainer = styled.div`
  display: grid;
  /* gap: ${52 / 16}rem; */
  max-width: 500px;
  width: 100%;
  @media ${QUERIES.laptopAndUp} {
    justify-self: end;
  }
`

const QRCodeDisplayContainer = styled.div`
  /* To ensure we keep our nice rounded corners from any protruding images */
  overflow: hidden;
  align-self: start;
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  margin-top: 1rem;
  border-radius: 1rem;
  background: hsla(var(--colorModeQRCodeBackground));
  /* 
    Below. Required for Next/Image.
    layout="reposonsive" makes the image disappear,
    and adding a width & height to the parent container
    doesn't seem to help. So we are forcing the dimensions
    of parent span of Next/Image to be 100%. 
  */
  > span {
    width: 100% !important;
    height: 100% !important;
  }
  @media ${QUERIES.laptopAndUp} {
    justify-self: start;
    border-radius: 1rem;
    max-width: 500px;
    max-height: 500px;
  }
  /* position: absolute;
  top: var(--navHeight);
  left: 0;
  right: 0;
  border-radius: 0; */
`


export default QRCodeTemplate
