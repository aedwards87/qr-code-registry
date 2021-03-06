import React from 'react'
import styled from 'styled-components'

const CrossSVG = ({
  className,
  width = "22",
  height = "22",
  title = "Search",
  ...props
}) => {
  return (
    <Container
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/SearchSVG"
      {...props}
    >
      <title>{title}</title>
      <path className="svg_crosscolor" fillRule="evenodd" clipRule="evenodd" d="M21.4119 18.609L13.803 11L21.4119 3.37712C21.7835 3.00547 21.9923 2.50142 21.9923 1.97584C21.9923 1.45026 21.7835 0.946208 21.4119 0.574567C21.0403 0.202926 20.5362 -0.00585938 20.0106 -0.00585938C19.485 -0.00585937 18.981 0.202926 18.6093 0.574567L10.9864 8.1975L3.32145 0.574567C2.94981 0.202926 2.44576 -0.00585938 1.92018 -0.00585938C1.3946 -0.00585937 0.890544 0.202926 0.518903 0.574567C0.147262 0.946208 -0.0615234 1.45026 -0.0615234 1.97584C-0.0615234 2.50142 0.147262 3.00547 0.518903 3.37712L8.18387 11L0.518903 18.609C0.147262 18.9806 -0.0615234 19.4847 -0.0615234 20.0102C-0.0615234 20.5358 0.147262 21.0399 0.518903 21.4115C0.890544 21.7832 1.3946 21.9919 1.92018 21.9919C2.44576 21.9919 2.94981 21.7832 3.32145 21.4115L10.9864 13.8026L18.6093 21.4115C18.981 21.7832 19.485 21.9919 20.0106 21.9919C20.5362 21.9919 21.0403 21.7832 21.4119 21.4115C21.7835 21.0399 21.9923 20.5358 21.9923 20.0102C21.9923 19.4847 21.7835 18.9806 21.4119 18.609V18.609Z" />
    </Container>
  )
}


const Container = styled.svg`
  .svg_crosscolor {
    fill: hsl(var(--colorModeButtonHover));
  }
`

export default CrossSVG