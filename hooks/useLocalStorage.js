import React from 'react'

export default function useLocalStorageState(
  key,
  defaultValue = '',
  { serialise = JSON.stringify, deserialise = JSON.parse } = {}
) {


  const [state, setState] = React.useState(defaultValue)

  const prevKeyRef = React.useRef(key)

  React.useLayoutEffect(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return setState(deserialise(valueInLocalStorage))
    }
    return setState(defaultValue)
  }, [key, deserialise, defaultValue])


  React.useLayoutEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialise(state))
  }, [state, key, serialise]);

  return [state, setState]
}