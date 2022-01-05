import React from 'react'
import styled from 'styled-components'

const SearchSVG = ({
  className,
  width = "21",
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
      <path className="svg_searchcolor" d="M9.17906 18.8458C11.1683 18.847 13.1034 18.1982 14.6899 16.9982L18.8032 21.1116C19.0158 21.3239 19.2959 21.455 19.5951 21.4823C19.8943 21.5096 20.1935 21.4313 20.441 21.261C20.5613 21.1603 20.6724 21.0492 20.7732 20.9289C20.9436 20.6814 21.022 20.3821 20.9947 20.0829C20.9674 19.7837 20.8363 19.5035 20.624 19.2908L16.5106 15.1775C17.7508 13.5243 18.3964 11.5007 18.3427 9.43473C18.2891 7.36875 17.5393 5.38142 16.215 3.79482C14.8906 2.20823 13.0693 1.11536 11.0461 0.693314C9.02301 0.271273 6.91663 0.544798 5.06839 1.46956C3.22015 2.39433 1.73835 3.91613 0.863143 5.78835C-0.012064 7.66057 -0.229388 9.77348 0.246391 11.7847C0.722171 13.7958 1.86317 15.5874 3.48448 16.869C5.10578 18.1507 7.11237 18.8472 9.17906 18.8458V18.8458ZM9.17906 2.81719C10.5338 2.81719 11.8581 3.21891 12.9845 3.97155C14.1109 4.72419 14.9888 5.79395 15.5073 7.04555C16.0257 8.29715 16.1613 9.67438 15.8971 11.0031C15.6328 12.3318 14.9804 13.5522 14.0225 14.5102C13.0645 15.4681 11.8441 16.1205 10.5154 16.3848C9.18667 16.6491 7.80945 16.5134 6.55785 15.995C5.30624 15.4766 4.23648 14.5986 3.48384 13.4722C2.73119 12.3458 2.32947 11.0215 2.32947 9.66679C2.33157 7.85081 3.0539 6.10981 4.33799 4.82572C5.62208 3.54162 7.36308 2.81929 9.17906 2.81719V2.81719Z" />
    </Container>
  )
}


const Container = styled.svg`
  .svg_searchcolor {
    fill: hsl(var(--colorModeButtonHover));
  }
`

export default SearchSVG