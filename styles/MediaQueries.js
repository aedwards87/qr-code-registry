import { useLayoutEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { BREAKPOINTS } from '../utils/constants'

// Check to see if window is there then proceeed
export const useMediaQuerySSR = ({ minWidth, maxWidth, query }) => {
  const [matches, setMatches] = useState()
  const findSize = useMediaQuery({ minWidth, maxWidth, query })
  useLayoutEffect(() => {
    setMatches(findSize)
  }, [findSize, setMatches]);
  return matches
}

const Desktop = ({ children }) => {
  const matches = useMediaQuerySSR({ minWidth: 980 })
  return matches ? children : null
}

const Laptop = ({ children }) => {
  const matches = useMediaQuerySSR({ maxWidth: 979 })
  return matches ? children : null
}

const LargeTablet = ({ children }) => {
  const matches = useMediaQuerySSR({ minWidth: BREAKPOINTS.largeTabletMin, maxWidth: BREAKPOINTS.laptopMin - 1 })
  return matches ? children : null
}

const LargeScreens = ({ children }) => {
  const matches = useMediaQuerySSR({ minWidth: BREAKPOINTS.largeTabletMin })
  return matches ? children : null
}

const SmallScreens = ({ children }) => {
  const matches = useMediaQuerySSR({ maxWidth: BREAKPOINTS.largeTabletMin - 1 })
  return matches ? children : null
}

const Tablet = ({ children }) => {
  const matches = useMediaQuerySSR({ minWidth: BREAKPOINTS.tabletMin, maxWidth: BREAKPOINTS.largeTabletMin - 1 })
  return matches ? children : null
}

const Mobile = ({ children }) => {
  const matches = useMediaQuerySSR({ minWidth: BREAKPOINTS.largeTabletMin, maxWidth: BREAKPOINTS.laptopMin - 1 })
  return matches ? children : null
}




export { Desktop, Laptop, Mobile, Tablet, LargeTablet, SmallScreens, LargeScreens }