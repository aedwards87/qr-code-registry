import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"
import { motion } from 'framer-motion'

export function CustomLink({ children, className, href = "/", ...props }) {
  const router = useRouter()
  return (
    <Link href={href} passHref className={className}>
      <Container
        className={className}
        aria-current={router.pathname === href ? "page" : null}
        {...props}
      >
        {children}
      </Container>
    </Link>
  )
}

// Base link styling
export const Container = styled(motion.a)`
  padding: 0;
  margin: 0;
  font-family: inherit;
  text-decoration: none;
  outline-offset: .5rem;
`

// Extension of link with decorative drop shadow
export const ShadowLink = styled(CustomLink)`
  transition: filter .5s ease, color .3s ease-in-out;
  &:not([aria-current="page"]) {
    :hover,
    :focus-visible {
      filter: 
        drop-shadow(0px 0px 3px hsl(var(--colorModeDecorative)))
        drop-shadow(0px 0px 6px hsl(var(--colorModeDecorative)))
        drop-shadow(0px 0px 10px hsl(var(--colorModeDecorative)));
    }
  }
`

/* // Extension of shadowbutton to cater for links with containing SVGs */
export const ShadowLinkSVG = styled(ShadowLink)`
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