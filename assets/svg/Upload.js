import React from 'react'
import styled from 'styled-components'

const UploadSVG = ({
  className,
  width = "21",
  height = "21",
  title = "Upload",
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
      <path className="svg_uploadcolor" d="M11.7712 15.0757L11.7712 4.82906L14.3059 7.36379L16.0992 5.57047L11.4005 0.871723C11.2828 0.753888 11.143 0.66041 10.9892 0.59663C10.8353 0.532851 10.6704 0.500024 10.5038 0.500024C10.3373 0.500024 10.1724 0.532851 10.0185 0.59663C9.86466 0.660409 9.72489 0.753888 9.60718 0.871723L4.90844 5.57047L6.70176 7.36378L9.23648 4.82906L9.23648 15.0757L11.7712 15.0757Z" />
      <path className="svg_uploadcolor" d="M5.43444 20.7777H15.5733C16.6511 20.7751 17.7 20.4292 18.5677 19.79C19.4355 19.1509 20.077 18.2518 20.3991 17.2233C20.7212 16.1949 20.7072 15.0905 20.359 14.0705C20.0108 13.0506 19.3467 12.1681 18.4629 11.5513L16.6126 13.4016C17.1384 13.6412 17.5666 14.0532 17.8263 14.5695C18.0859 15.0858 18.1613 15.6752 18.04 16.2402C17.9187 16.8052 17.608 17.3118 17.1594 17.676C16.7108 18.0403 16.1512 18.2403 15.5733 18.2429H5.43444C4.85507 18.2426 4.2933 18.0438 3.84269 17.6796C3.39208 17.3154 3.07984 16.8078 2.95797 16.2414C2.83609 15.675 2.91193 15.0839 3.17287 14.5666C3.43381 14.0493 3.86408 13.6371 4.39204 13.3984L2.54169 11.5481C1.65634 12.1646 0.990775 13.0476 0.641797 14.0684C0.292819 15.0893 0.27863 16.1949 0.601296 17.2244C0.923962 18.2539 1.56665 19.1536 2.43589 19.7926C3.30513 20.4317 4.35557 20.7768 5.43444 20.7777V20.7777Z" />
    </Container>
  )
}


const Container = styled.svg`
  .svg_uploadcolor {
    fill: hsl(var(--colorModeButtonHover));
  }
`

export default UploadSVG