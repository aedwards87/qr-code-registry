import { useContext, createContext, useState, useMemo, useEffect } from 'react';

// Create context
const StoreContext = createContext();

export function StateContextProvider({ children, initialState = '' }) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
  }, [initialState]);

  const contextValue = useMemo(() => [state, setState], [state, setState])

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStateContext = () => useContext(StoreContext)
