// Dependencies
import React from 'react'
import styled from 'styled-components'
// Components
import Nav from './Nav'
import Logo from '../../assets/svg/logo'
import LightAndDark from '../../assets/svg/LightAndDark'
import { ShadowButtonSVG, ShadowButton } from '../../styles/components'
// Hooks
import {
  useNavMenuToggle,
  useOnClickOutside,
  useModeToggler,
} from '../../hooks'
// Utilitiess
import { QUERIES } from '../../utils/constants'

// ------------------------------
// The component
// ------------------------------
const Header = ({ siteTitle = 'QR code register' }) => {
  // Call hook using state to toggle menu (small devices only)
  const [isMenuOpen, setIsMenuOpen, toggleMenu, handlers] = useNavMenuToggle()
  const [mode, toggleMode] = useModeToggler() // Toggle light/dark modes
  // Call hook passing in the ref and a function to call on outside click
  const ref = useOnClickOutside(setIsMenuOpen)
  const modeTitle = `Activate ${mode} mode` // Coniditional title
  const menuTitle = isMenuOpen ? 'Close menu' : 'Open menu' // Coniditional title

  return (
    <Container ref={ref}>
      <div>
        <HomeButton href="/" {...handlers}>
          <Logo>{siteTitle}</Logo>
        </HomeButton>
        <MenuButton
          onClick={toggleMenu}
          aria-label={menuTitle}
          title={menuTitle}
        />
        <Nav isMenuOpen={isMenuOpen} handlers={handlers} />
        <ModeButton
          onClick={toggleMode}
          aria-label={modeTitle}
          title={modeTitle}
        >
          <LightAndDark />
        </ModeButton>
      </div>
    </Container>
  )
}

// ------------------------------
// Styles
// ------------------------------
const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  /* padding: 0 min(${40 / 16}rem, 7vw);
  display: flex;
  align-items: center;
  justify-content: space-between; */
  background: hsl(var(--colorMode));
  && {
    grid-column: 1 / -1;
  } /* Necessary to overide Layout component styles */
  transition: background 0.3s ease; /* required for smooth transition between color modes */
  z-index: 10000;
  /* Visual seperator for nav bar */
  /* box-shadow: 0px 0px 15px hsla(var(--colorModeLink) / .2); */
  > div {
    display: flex;
    height: var(--navHeight);
    margin: auto;
    padding: 0 min(2.3rem, 7vw);
    justify-content: space-between;
    max-width: var(--desktopOuterMaxWidth);
    gap: 1.5rem;
    align-items: center;
  }
`

const HomeButton = styled(ShadowButtonSVG)`
  margin-right: auto;
  z-index: 20000;
  @media ${QUERIES.largeTabletAndUp} {
    margin-right: 0;
  }
`

const ModeButton = styled(ShadowButtonSVG)`
  z-index: 20000;
  transform: translateX(20%);
  order: 3;
  @media ${QUERIES.largeTabletAndUp} {
    order: 2;
  }
`

const MenuButton = styled(ShadowButton)`
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  height: ${20 / 16}rem;
  width: ${20 / 16}rem;
  z-index: 20000;
  order: 4;
  transition: display 1s ease-in-out;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 0.1rem;
    background: hsl(var(--colorModeLink));
    border-radius: 1rem;
    transform-origin: center;
    transition: transform 0.25s ease-in-out;
  }
  &::before {
    top: 30%;
  }
  &::after {
    top: 70%;
  }
  &[aria-label='Close menu']::before {
    transform: rotate(45deg) translate(11%, 140%);
  }
  &[aria-label='Open menu']::before {
    transform: rotate(0) translate(0);
  }
  &[aria-label='Close menu']::after {
    transform: rotate(-45deg) translate(16%, -214%);
  }
  &[aria-label='Open menu']::after {
    transform: rotate(0) translate(0);
  }
  &:hover,
  &:focus-visible {
    ::before,
    ::after {
      background: hsl(var(--colorModeLinkHover));
    }
  }
  @media ${QUERIES.largeTabletAndUp} {
    display: none;
  }
`

export default Header
