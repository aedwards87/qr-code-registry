import React from 'react'
import styled from 'styled-components'

const UploadSVG = ({
  className,
  width = "24",
  height = "24",
  title = "Find duplicate names",
  ...props
}) => {
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
      <title>{title}</title>
      <path className="svg_duplicatecolor" d="M14.9873 0.5H1.81425C1.20239 0.5 0.734497 0.967894 0.734497 1.57975V14.7528C0.734497 15.3646 1.20239 15.8325 1.81425 15.8325H14.9873C15.5991 15.8325 16.067 15.3646 16.067 14.7528V1.57975C16.067 1.00389 15.5991 0.5 14.9873 0.5ZM13.9075 13.673H2.89401V2.65951H13.9075V13.673Z" fill="#7CCEF4" />
      <path className="svg_duplicatecolor" d="M10.0925 20.8715V17.2723H7.93298V21.9512C7.93298 22.5631 8.40088 23.031 9.01274 23.031H22.1857C22.7976 23.031 23.2655 22.5631 23.2655 21.9512V8.77824C23.2655 8.16638 22.7976 7.69849 22.1857 7.69849H17.5068V9.858H21.106V20.8715H10.0925V20.8715Z" />
    </Container>
  )
}


const Container = styled.svg`
  .svg_duplicatecolor {
    fill: hsl(var(--colorModeButtonHover));
  }
`

export default UploadSVG