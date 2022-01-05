import { useContext, createContext, useState, useMemo, useCallback, useEffect } from 'react';

// Create context
const StoreContext = createContext();

export function NavMenuToggleProvider({ children, initialState = false }) {
  const [isToggled, setIsToggled] = useState(initialState)

  const toggle = useCallback(() => {
    setIsToggled(old => !old);
  }, []);

  const bind = useMemo(() => {
    return {
      onMouseUp: () => setIsToggled(false),
      onTouchEnd: () => setIsToggled(false),
    }
  }, [])

  useEffect(() => {
    // Check if device has touch capability
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    // Add some and remove CSS when toggled
    // Overflow: hidden stops any background scrolling whilst the nav menu is open
    // The addition of the class blurs the background and reduces opacity
    // As backdrop-filter isn't avilable on firefox yet.
    if (isToggled) {
      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
      document.getElementsByTagName('main')[0].classList.add('burger-menu_background-blur');
      document.getElementsByTagName('footer')[0].classList.add('burger-menu_background-blur');
    } else {
      document.getElementsByTagName('html')[0].style.overflowY = '';
      document.getElementsByTagName('main')[0].classList.remove('burger-menu_background-blur');
      document.getElementsByTagName('footer')[0].classList.remove('burger-menu_background-blur');
    }

    // Check if touch device and menu is toggled
    // add some margin-right to account for the scroll bar
    if (!isTouchDevice && isToggled) {
      document.body.style.marginRight = '.95rem';
    } else {
      document.body.style.marginRight = 0;
    }
  }, [isToggled])

  return (
    <StoreContext.Provider value={[isToggled, setIsToggled, toggle, bind]}>
      {children}
    </StoreContext.Provider>
  );
}

export const useNavMenuToggle = () => useContext(StoreContext)
