// Page titles
export const PAGE_TITLES = ['generate', 'add', 'scan', 'data', 'logout']

export const BREAKPOINTS = {
  tabletMin: 550,
  largeTabletMin: 800,
  laptopMin: 1100,
  desktopMin: 1500,
}

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem )`,
  largeTabletAndUp: `(min-width: ${BREAKPOINTS.largeTabletMin / 16}rem )`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem )`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem )`,
}

export const PATTERNS = {
  name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/i,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const FORM_RULES = {
  firstName: {
    required: "Please enter your first name",
    pattern: {
      value: PATTERNS.name,
      message: "Numbers and certain special characters are not allowed"
    }
  },
  lastName: {
    required: "Please enter your last name",
    pattern: {
      value: PATTERNS.name,
      message: "Numbers and certain special characters are not allowed"
    }
  },
  emailAddress: {
    required: "Please enter your email address",
    pattern: {
      value: PATTERNS.email,
      message: "Please enter a vaild email address"
    }
  },
}

export const INITIALSTATE = {
  firstName: '',
  lastName: '',
  companyName: '',
  emailAddress: ''
}