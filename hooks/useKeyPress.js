import { useEffect } from 'react'

const useKeyPress = (action, key = 'Escape') => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === key) action()
    })
    return () => {
      document.removeEventListener('keydown', (e) => e)
    }
  }, [key, action])
}

export default useKeyPress
