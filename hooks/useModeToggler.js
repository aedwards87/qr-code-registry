import { useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import useLocalStorage from './useLocalStorage'
/*
  Light and Dark Color Mode Toggler.
  --
  Instead of using context to create a ThemeProvider, 
  we add a 'data' attribute to 'body' called 'data-mode'.
  This hook will toggle between 'light' and 'dark' which
  will in turn define the CSS variables that will be applied.
  --
  This method has better performance, see https://epicreact.dev/css-variables/
*/

const useModeToggler = (initialValue = 'dark') => {
  // Set color mode state from opreating system
  const [systemMode, setSystemMode] = useState(initialValue)
  // Set color mode state from local storage, taking in OS state as initialValue
  const [localStorageMode, setLocalStorageMode] = useLocalStorage('mode', systemMode)
  // Toggle between dark and light modes
  const toggleMode = useCallback(() => {
    setLocalStorageMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  }, [setLocalStorageMode]);
  // Add the dataset property of color mode state to the body tag
  useEffect(() => {
    document.body.dataset.mode = localStorageMode
  }, [localStorageMode])
  // Query to see what the users prefered color mode is e.g. dark
  useMediaQuery(
    { query: '(prefers-color-scheme: dark)' },
    undefined,
    (isSystemDark) => setSystemMode(isSystemDark ? 'dark' : 'light')
  );
  return [localStorageMode, toggleMode]
}

export default useModeToggler