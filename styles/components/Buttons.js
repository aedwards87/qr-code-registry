// Dependencies
import Link from "next/link"
import styled from "styled-components"
import { motion } from 'framer-motion'
import { QUERIES } from "../../utils/constants"

// ------------------------------
// The button component
// ------------------------------
export function Button({ children, onClick, className, href, ...props }) {
  // Display this without routing
  if (!href) {
    return (
      <Container role="button" className={className} onClick={onClick} {...props}>
        {children}
      </Container>
    )
  }
  // Display this with routing
  if (href) {
    return (
      <Link href={href} passHref>
        <Container role="button" className={className} onClick={onClick} {...props}>
          {children}
        </Container>
      </Link>
    )
  }
}

// ------------------------------
// Style variations
// ------------------------------

// Base button styling
export const Container = styled(motion.button)`
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border: none;
  background: transparent;
  cursor: pointer;
  outline-offset: .5rem;
`

// Extension of button with decorative drop shadow
export const ShadowButton = styled(Button)`
  transition: filter .5s ease, color .3s ease-in-out;
  &:hover,
  &:focus-visible {
    filter: 
      drop-shadow(0px 0px 3px hsl(var(--colorModeDecorative)))
      drop-shadow(0px 0px 6px hsl(var(--colorModeDecorative)))
      drop-shadow(0px 0px 10px hsl(var(--colorModeDecorative)));
  }
`

// Extension of shadowbutton to cater for buttons containing SVGs
export const ShadowButtonSVG = styled(ShadowButton)`
  .svg_fillColor {
    fill: hsl(var(--colorModeLink));
    transition: fill .3s ease-in-out;
  }
  &:hover,
  &:focus-visible {
    .svg_fillColor {
      fill: hsl(var(--colorModeLinkHover));
    }
  }
`

export const SubmitButton = styled(Button)`
  background: hsl(var(--colorPrimary));
  height: ${70 / 16}rem;
  border-radius: 10rem;
  font-weight: var(--fontWeightMedium);
  color: hsl(var(--colorWhite));
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;
  outline: none;
  transition: all .3 ease;
  &:focus-visible,
  &:hover {
    border: 2px solid hsl(var(--colorModeButtonHover));
    box-shadow: 0 0 0 4px hsla(var(--colorPrimary));
  }
`

export const GhostSubmitButton = styled(SubmitButton)`
  position: relative;
  background: hsl(var(--colorModeResetButton));
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  width: min-content;
  &:focus-visible,
  &:hover {
    box-shadow: 0 0 0 4px hsla(var(--colorModeResetButton));
  }
  > svg {
    position: absolute;
  }
  @media ${QUERIES.tabletAndUp} {
    padding: 0;
    aspect-ratio: revert;
    width: 100%;
  }
`

export const ToolBarButton = styled(ShadowButtonSVG)`
  &, .csv_download_button {
    position: relative;
    width: min(60px, 13vw);
    height: min-content;
    aspect-ratio: 1;
    border: none;
    background: hsl(226 47% 38%);
    border-radius: 50px;
    /* margin-bottom: 1rem; */
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  
`

