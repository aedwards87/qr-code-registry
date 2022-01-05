// Dependencies
import React from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
// Components
import { SubmitButton } from '../styles/components'
// Hooks
import { useOnClickOutside, useStateContext } from '../hooks'
// Utilities
import { QUERIES } from '../utils/constants'

// ------------------------------
// QrCodeScanner Component
// ------------------------------
export default function QrCodeScanner({ stopQrScanner }) {
  const [{ qrReaderID, isScanOpen, isLaptopAndUp }] = useStateContext()
  const shouldReduceMotion = useReducedMotion()
  // Main use is to stop the scanner when using the nav / nav menu
  // const ref = useOnClickOutside((!isLaptopAndUp && isScanOpen) && stopQrScanner)
  const ref = useOnClickOutside(isScanOpen && stopQrScanner)

  return (
    <Container>
      <Scanner
        id={qrReaderID}
        ref={ref}
        $isScanOpen={isScanOpen}
        custom={isScanOpen}
        variants={scannerVariants}
        {...animatePropsScanner}
      />
      <AnimatePresence>
        {!isLaptopAndUp && isScanOpen && (
          <CloseButton
            onClick={stopQrScanner}
            custom={shouldReduceMotion}
            variants={closeButtonVariants}
            {...animatePropsButton}
          >
            X
          </CloseButton>
        )}
      </AnimatePresence>
    </Container>
  )
}

// ------------------------------
// Animations
// ------------------------------
const animatePropsScanner = {
  initial: 'initial',
  animate: (isScanOpen) => (isScanOpen ? 'animate' : 'initial'),
}

const animatePropsButton = {
  initial: 'initial',
  animate: 'animate',
}

const scannerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

const closeButtonVariants = {
  initial: (shouldReduceMotion) => {
    return shouldReduceMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          y: '100%',
          transition: {
            delay: 0,
            duration: 0.3,
          },
        }
  },
  animate: (shouldReduceMotion) => {
    return shouldReduceMotion
      ? {
          opacity: 1,
          transition: {
            delay: 1,
          },
        }
      : {
          opacity: 1,
          y: '0',
          transition: {
            delay: 1,
          },
        }
  },
}

// ------------------------------
// Styles
// ------------------------------
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  video {
    width: 100% !important;
  }
`

const CloseButton = styled(SubmitButton)`
  justify-self: center;
  position: absolute;
  bottom: 8rem;
  /* top: calc(100vh - 13rem); */
  width: min-content;
  height: 3.375rem;
  aspect-ratio: 1;
  background: hsl(var(--colorError));
  z-index: 20000;
  &:focus-visible,
  &:hover {
    border: 2px solid hsl(var(--colorModeButtonHover));
    box-shadow: 0 0 0 4px hsla(var(--colorError));
  }
`

const Scanner = styled(motion.div)`
  width: 100%;
  display: ${({ $isScanOpen }) => ($isScanOpen ? 'block' : 'none')};
  background: hsl(var(--colorMode) / 0.9);
  transition: background 1s ease;
  canvas,
  video {
    min-width: 100%;
    min-height: 100%;
  }
  video {
    object-fit: cover;
  }
  @media ${QUERIES.laptopAndUp} {
    border-radius: 1rem;
    overflow: hidden; /* To ensure rounded corners */
    background: none;
  }
`
