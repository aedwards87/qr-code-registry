import React from 'react'
import styled from 'styled-components'

const RefreshSVG = ({
  className,
  width = "27",
  height = "22",
  title = "Refresh",
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
      <path className="svg_refreshcolor" d="M9.09995 8.3C8.79995 7.8 8.19995 7.6 7.69995 7.9L5.49995 9.2C6.19995 5.4 9.59995 2.5 13.6 2.5C15.8 2.5 17.9 3.4 19.5 5C19.9 5.4 20.5 5.4 20.9 5C21.3 4.6 21.3 4 20.9 3.6C19 1.6 16.4 0.5 13.6 0.5C8.69995 0.5 4.59995 3.9 3.59995 8.5L2.59995 6.8C2.29995 6.3 1.69995 6.1 1.19995 6.4C0.699951 6.7 0.599951 7.3 0.899951 7.8L2.79995 11C3.09995 11.4 3.59995 11.9 4.39995 11.9C4.69995 11.9 5.09995 11.8 5.39995 11.6L8.69995 9.6C9.19995 9.4 9.29995 8.7 9.09995 8.3Z" />
      <path className="svg_refreshcolor" d="M26.5999 13.7L24.6999 10.5C24.4999 10.2 24.1999 9.89997 23.6999 9.69997C23.1999 9.49997 22.6999 9.49997 22.0999 9.89997L18.7999 11.9C18.2999 12.2 18.1999 12.8 18.4999 13.3C18.7999 13.8 19.3999 13.9 19.8999 13.6L22.0999 12.3C21.3999 16.1 17.9999 19 13.9999 19C11.7999 19 9.6999 18.1 8.0999 16.5C7.6999 16.1 7.0999 16.1 6.6999 16.5C6.2999 16.9 6.2999 17.5 6.6999 17.9C8.5999 19.9 11.1999 21 13.9999 21C18.8999 21 22.9999 17.6 23.9999 13L24.9999 14.7C25.1999 15 25.4999 15.2 25.8999 15.2C26.0999 15.2 26.2999 15.2 26.3999 15.1C26.7999 14.8 26.8999 14.2 26.5999 13.7Z" />
    </Container>
  )
}


const Container = styled.svg`
  .svg_refreshcolor {
    fill: hsl(var(--colorModeButtonHover));
  }
`

export default RefreshSVG