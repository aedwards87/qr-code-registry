// Dependencies
import Head from 'next/head'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
// Components
import QRCodeScanner from '../../components/QrCodeScanner'
import { HeroTitle, ScanTitle, SubmitButton } from '../../styles/components'
// Utilities
import { QUERIES } from '../../utils/constants'
import { camalise, reformedTitle } from '../../utils/helpers'
// Hooks
import { useQrCodeScanner, useStateContext } from '../../hooks'
import { useAuth } from '../../hooks/context/useAuthContext'
import { useEffect, useLayoutEffect } from 'react'

// TODO: CURRENT ISSUE
// Scanner won't pick up on white QR Codes!!

// ------------------------------
// Scan Component
// ------------------------------
const Scan = ({ title = 'QR Code', initialState }) => {
  const router = useRouter()
  const [
    {
      data,
      isScanSuccess,
      isScanFailure,
      isLaptopAndUp,
      isScanOpen,
      qrReaderID,
    },
    setState,
  ] = useStateContext()
  const { startQrScanner, stopQrScanner, onLoadScanURL } = useQrCodeScanner({
    qrReaderID,
  })

  // If there is a URL query string of qr-code call onLoadScanURL function
  useEffect(() => {
    if (router.query['qr-code']) {
      onLoadScanURL(router.query['qr-code'])
    }
    // Using onLoadScanURL function as a dependency cause an infinite render loop and we don't want that
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  // Array of titles
  // TODO: make the data emailAddress instead of just email
  const fieldTitles = [
    'First Name',
    'Last name',
    'Email address',
    'Company name',
  ]

  // Determines what title to display
  // dependant on a succuessful scan or not
  const scanTitle = isScanSuccess
    ? 'Successful'
    : isScanFailure
    ? 'Unsuccessful'
    : 'Results'

  const stopScanner = () => {
    setState(initialState)
    stopQrScanner()
  }

  const startScanner = () => {
    setState(initialState)
    startQrScanner()
  }

  return (
    <Frame>
      <Container>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ResultsDisplayContainer>
          <HeroTitle>
            {reformedTitle(title).firstWord}
            <br />
            {reformedTitle(title).restTitle}
            <span>.</span>
          </HeroTitle>
          <ScanTitle scanTitle={scanTitle} as="h2">
            {scanTitle}
          </ScanTitle>
          <InnerContainer>
            {fieldTitles.map((title) => {
              if (title === 'Email address') {
                title = 'Email'
              }
              return (
                <List key={title}>
                  <Label>{title}</Label>
                  <Text scanTitle={scanTitle}>{data[camalise(title)]}</Text>
                </List>
              )
            })}
            {isLaptopAndUp && isScanOpen ? (
              <CloseButton onClick={stopScanner}>Stop scanning</CloseButton>
            ) : (
              <OpenButton onClick={startScanner}>Start scanning</OpenButton>
            )}
          </InnerContainer>
        </ResultsDisplayContainer>
        {/* <button onClick={auth.login}>LOGIN</button>
        <button onClick={auth.logout}>LOGOUT</button> */}
        <QRCodeDisplayContainer isScanOpen={isScanOpen}>
          {/* We pass the stopQRscanner function as a prob to so it works,
          using the same iteration of the scanner with the id */}
          <QRCodeScanner stopQrScanner={stopQrScanner} />
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
  padding-top: min(3.25rem, 10vw);
  @media ${QUERIES.tabletAndUp} {
    justify-items: center;
    padding: 4rem 0;
  }
  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`

const InnerContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: 1fr 1fr;
  }
`
const List = styled.li`
  position: relative;
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    grid-column: 1 / -1;
  }
  @media ${QUERIES.tabletAndUp} {
    &:nth-child(1),
    &:nth-child(2) {
      grid-column: revert;
    }
  }
`
const Text = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  height: ${70 / 16}rem;
  width: 100%;
  padding: 1.2rem 1.2rem 0.1rem;
  background: hsla(var(--colorModeShade) / 0.1);
  color: hsl(var(--colorModeText));
  border-radius: ${15 / 16}rem;
  text-overflow: ellipsis;
  ${({ scanTitle }) =>
    scanTitle === 'Successful'
      ? css`
          background: hsla(var(--colorSuccess) / 0.4);
        `
      : scanTitle === 'Unsuccessful'
      ? css`
          background: hsla(var(--colorError) / 0.4);
        `
      : null}
`
const Label = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  font-size: ${12 / 16}rem;
  font-weight: var(--fontWeightMedium);
  color: hsl(var(--colorModeDot));
  pointer-events: none;
  transition: all 0.3 ease;
  transform-origin: left;
  bottom: 50%;
`
const OpenButton = styled(SubmitButton)``
const CloseButton = styled(SubmitButton)`
  background: hsl(var(--colorError));
  &:focus-visible,
  &:hover {
    border: 2px solid hsl(var(--colorWhite));
    box-shadow: 0 0 0 4px hsla(var(--colorError));
  }
`

const ResultsDisplayContainer = styled.div`
  display: grid;
  /* gap: ${52 / 16}rem; */
  max-width: 500px;
  width: 100%;
  @media ${QUERIES.laptopAndUp} {
    justify-self: end;
  }
`

const QRCodeDisplayContainer = styled.div`
  position: fixed;
  top: var(--navHeight);
  left: 0;
  right: 0;
  /* bottom: 0; */
  height: 100%;
  width: 100%;
  max-width: 100%;
  pointer-events: ${({ isScanOpen }) => (isScanOpen ? 'auto' : 'none')};
  @media ${QUERIES.laptopAndUp} {
    height: auto;
    position: revert;
    align-self: start;
    justify-self: start;
    display: grid;
    place-items: center;
    max-width: 500px;
    max-height: 500px;
    aspect-ratio: 1;
    margin-top: 1rem;
    background: hsla(var(--colorModeShade) / 0.1);
    border-radius: 1rem;
    overflow: hidden; /* To ensure rounded corners */
  }
`

export default Scan
