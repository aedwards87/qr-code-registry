import React from 'react'
import styled from 'styled-components'

const ResetSVG = ({ className, width = "95", height = "84.5", ...props }) => {
  return (
    <Container
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Reset form fields</title>
      <path className="svg_colorReset" d="M84.5 42.7H92.1C94.3 42.7 95.7 40.3 94.5 38.4L81.8 17.9C80.7 16.1 78.1 16.1 77 17.9L64.2 38.3C63 40.2 64.4 42.6 66.6 42.6H74.2C74.2 42.7 74.2 42.8 74.2 42.8C73.9 59.9 59.7 74 42.6 74.1C24.1 74.3 9.19999 58.7 10.5 40C11.5 24.6 23.8 11.9 39.2 10.4C47.3 9.6 54.8 11.8 60.8 16.1C62.2 17.1 64.1 16.7 65 15.2L67.3 11.3C68.1 10 67.7 8.3 66.5 7.4C59.5 2.8 51.2 0 42.3 0C17.9 0 -1.70001 20.7 0.0999859 45.5C1.59999 66.2 18.3 82.9 39 84.4C63.7 86.3 84.3 66.9 84.5 42.7Z" />
    </Container>
  )
}


const Container = styled.svg`
  .svg_colorReset {
    fill: hsl(var(--colorWhite));
  }
`

export default ResetSVG