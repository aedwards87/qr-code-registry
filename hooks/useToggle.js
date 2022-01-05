import { useState, useCallback, useMemo } from 'react';

const useToggle = (initialState = false) => {
  const [isToggled, setIsToggled] = useState(initialState)

  const toggle = useCallback((action) => {
    if (action) {
      setIsToggled(action);
    } else if (!action) {
      setIsToggled(old => !old);
    }
  }, []);

  const bind = useMemo(() => {
    return {
      onFocus: () => setIsToggled(true),
      onBlur: () => setIsToggled(false),
      onClick: () => setIsToggled(true),
    }
  }, [])

  return [isToggled, toggle, bind]
}

export default useToggle