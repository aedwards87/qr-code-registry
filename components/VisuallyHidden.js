import React from 'react'
import styled from 'styled-components'

const VisuallyHidden = ({ children, component = 'span', ...props }) => {
  const [forceShow, setForceShow] = React.useState(false)

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev) => {
        if (ev.key === 'Alt') {
          setForceShow(true)
        }
      }
      const handleKeyUp = (ev) => {
        if (ev.key === 'Alt') {
          setForceShow(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
      }
    }
  }, [])

  if (forceShow) {
    return children
  }

  return (
    <HiddenStyles as={component} {...props}>
      {children}
    </HiddenStyles>
  )
}

const HiddenStyles = styled.span`
  /* All styling to visual hide an element */
  display: inline-block;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1;
  width: 1;
  margin: -1;
  padding: 0;
  border: 0;
  inset: 0;
`

export default VisuallyHidden
