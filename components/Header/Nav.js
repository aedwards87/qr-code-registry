// Dependencies
import React from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'framer-motion'
// Components
import { ShadowLink } from '../../styles/components'
import { LargeScreens, SmallScreens } from '../../styles/MediaQueries'
// Utilities
import { QUERIES, PAGE_TITLES } from '../../utils/constants'
import { capitilise } from '../../utils/helpers'
import { useMediaQuerySSR } from '../../styles/MediaQueries'


// ------------------------------
// The component
// ------------------------------
const Nav = ({ isMenuOpen, handlers }) => {
  const shouldReduceMotion = useReducedMotion()
  const query = useMediaQuerySSR({ query: QUERIES.largeTabletAndUp })

  return (
    <MediaQuery isMenuOpen={isMenuOpen}>
      {PAGE_TITLES.map((title, i) =>
        title && (
          <NavLink
            tabIndex={!query ? -1 : null}
            key={title}
            href={title === 'generate' ? '/' : `/${title}`}
            variants={navLinkVariants(shouldReduceMotion)}
            {...handlers}
          >
            {capitilise(title)}
          </NavLink>
        )
      )}
    </MediaQuery>
  )
}

// Using a WindowSize hook to determine the screen width
// and create conditionals inside the props for the animation
// wasn't working e.g. variants={isMovile && variants}.
// Opting for React Responsive package to create seperate  
// components dependant on screen size with there own props
// has proven to work.
const MediaQuery = ({ children, isMenuOpen }) => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <>
      <SmallScreens>
        <Container
          aria-label="Primary navigation"
          variants={navVariants(shouldReduceMotion)}
          {...animateProps(isMenuOpen)}
        >
          {children}
        </Container>
      </SmallScreens>
      <LargeScreens>
        <Container aria-label="Primary navigation">
          {children}
        </Container>
      </LargeScreens>
    </>
  )
}

// ------------------------------
// Animations
// ------------------------------
const navVariants = (shouldReduceMotion) => {
  return {
    open: {
      opacity: 1,
      pointerEvents: 'auto',
      background: 'hsla(var(--colorMode) / .9)',
      transition: !shouldReduceMotion && {
        background: { type: "spring", damping: 25 },
        duration: .3,
        staggerChildren: .08,
        delayChildren: .1,
      }
    },
    closed: {
      opacity: 0,
      pointerEvents: 'none',
      background: 'hsla(var(--colorMode) / 0)',
      transition: !shouldReduceMotion && {
        type: "spring", damping: 100, mass: 5,
        duration: .2,
        delay: .2,
        staggerChildren: .03,
        delayChildren: .08,
        staggerDirection: -1
      }
    }
  }
}

export const navLinkVariants = (shouldReduceMotion) => {
  return {
    open: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
    closed: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '-100%' },
  }
}

export const animateProps = (open) => {
  return {
    initial: 'closed',
    animate: open ? 'open' : 'closed'
  }
}

// ------------------------------
// Styles
// ------------------------------
const Container = styled(motion.nav)`
  display: flex;
  padding: calc(var(--navHeight) + 4rem) min(40px,7vw) 2rem;
  pointer-events: auto;
  flex-direction: column;
  position: fixed;
  inset: 0;
  gap: 2rem;
  a:last-child {
    margin-top: auto;
  }
  @media ${QUERIES.largeTabletAndUp} {
    padding: 0;
    background: none;
    position: revert;
    inset: revert;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`

const NavLink = styled(ShadowLink)`
  position: relative;
  font-weight: var(--fontWeightMedium);
  font-size: var(--fontSize600);
  color: hsl(var(--colorModeLink));
  &:hover,
  &:focus {
    color: hsl(var(--colorModeLinkHover));
  }
  &[aria-current="page"]  {
    color: hsla(var(--colorModeLink) / .6);
  }
  @media ${QUERIES.largeTabletAndUp} {
    font-size: var(--fontSize300);
    &[aria-current="page"]  {
      color: hsl(var(--colorModeLink));
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: .12rem;
      background: hsl(var(--colorModeLink));
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform .3s ease-in-out;
      z-index: -1;
    }
    /* focus-visible is correct, but the vscode color extension doesn't like it */
    &:hover::after, 
    &:focus-visible::after,
    &[aria-current="page"]::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`

export default Nav
