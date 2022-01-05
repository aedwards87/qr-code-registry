import { createGlobalStyle } from 'styled-components'
import { QUERIES } from '../utils/constants'

// Caluclation to be a REM unit
const navHeight = 70 / 18

export const GlobalStyles = createGlobalStyle`
  :root {
    --colorWhite: 0 0% 100%;
    --colorOffWhite: 0 0% 90%;
    --colorPrimary: 219 100% 41%; /* Blue */
    --color1: 226 100% 22%; /* Navy Blue */
    --colorSecondary: 226 100% 22%; /* Navy Blue */
    --colorDark: 226 100% 12%; /* Navy Blue */
    --colorTertiary: 199 85% 72%; /* Light Blue */
    --colorDecorativeOne: 333 100% 52%; /* Pink */
    --colorDecorativeTwo: 53 100% 50%; /* Yellow */
    --colorGrey: 226 11% 57%;
    --colorGrey100: 226 11% 85%;
    
    --colorSuccess: 137 100% 50%;
    --colorAlert: 351 100% 62%;
    --colorError: 351 100% 62%;
    --colorInfo: 351 100% 62%;

    --baseFontSize: 1rem;

    --fontSizeHeroXL: calc(var(--baseFontSize) * 4);
    --fontSizeHero: calc(var(--baseFontSize) * 3.213);
    --fontSize900: calc(var(--baseFontSize) * 2.88889);
    --fontSize800: calc(var(--baseFontSize) * 2.5);
    --fontSize700: calc(var(--baseFontSize) * 1.944442);
    --fontSize600: calc(var(--baseFontSize) * 1.5);
    --fontSize500: calc(var(--baseFontSize) * 1.22222);
    --fontSize400: calc(var(--baseFontSize) * 1);
    --fontSize300: calc(var(--baseFontSize) * 0.88889);
    --fontSize200: calc(var(--baseFontSize) * 0.833334);
    --fontSize100: calc(var(--baseFontSize) * 0.77778);

    --fontFamily: 'Work Sans', 'Rubik', Arial, serif;;
    --fontWeightLight: 400;
    --fontWeightNormal: 500;
    --fontWeightMedium: 600;
    --fontWeightBold: 700;
    --fontWeightXBold: 900;

    --desktopInnerMaxWidth: 1200px;
    --desktopOuterMaxWidth: 1350px;
    --navHeight: ${navHeight}rem;

    /* Increase overall font size for larger screen sizes for better readability */
    @media ${QUERIES.tabletAndUp} {
      --baseFontSize: 1.125rem;
    }
  }


  /* Color modes light */
  :root {
    --colorMode: var(--colorWhite);
    --colorModePrimary: var(--colorSecondary);
    --colorModeText: var(--colorSecondary);
    --colorModeShade: var(--colorSecondary);
    --colorModeLink: var(--colorSecondary);
    --colorModeDot: var(--colorPrimary);
    --colorModeLinkHover: var(--colorPrimary);
    --colorModeDecorative: var(--colorDecorativeTwo);
    --colorModeButtonHover: var(--colorWhite);
    --colorModeResetButton: var(--colorSecondary) / .6;
    --colorModeQRCodeBackground: var(--colorSecondary) / .1;
    --colorModeQRCodeBackgroundHover: var(--colorSecondary) / .3;
    --colorModeBoxShadow: 
        0 0 4px 2px hsla(226 94% 19% / .01),
        0 0 8px 2px hsla(226 94% 19% / .02),
        0 0 30px 2px hsla(226 94% 19% / .03);
  }

  /* Color modes dark */
  [data-mode="dark"] {
    --colorMode: var(--colorSecondary);
    --colorModePrimary: var(--colorSecondary);
    --colorModeText: var(--colorWhite);
    --colorModeShade: var(--colorWhite);
    --colorModeLink: var(--colorTertiary);
    --colorModeDot: var(--colorTertiary);
    --colorModeLinkHover: var(--colorWhite);
    --colorModeDecorative: var(--colorDecorativeOne);
    --colorModeButtonHover: var(--colorTertiary);
    --colorModeResetButton: var(--colorWhite) / .3;
    --colorModeQRCodeBackground: var(--colorTertiary);
    --colorModeQRCodeBackgroundHover: var(--colorTertiary) / .8;
    --colorModeBoxShadow: 
        0 0 4px 2px hsla(226 94% 19% / .2),
        0 0 8px 2px hsla(226 94% 19% / .4),
        0 0 30px 2px hsla(226 94% 19% / .6);
  }

  body::-webkit-scrollbar,
  .scrollBar::-webkit-scrollbar {
    width: .95rem;
    background: hsla(var(--colorModeText) / .1);
  }
  .scrollBar::-webkit-scrollbar {
    width: .3rem;
  }
  body::-webkit-scrollbar-thumb,
  .scrollBar::-webkit-scrollbar-thumb {
    background: hsla(var(--colorModeLink) / .2);
    &:hover {
      background: hsla(var(--colorModeLink) / .4);
    }
  }



  /* Resetting defaults */
  body, blockquote, figure, h1, h2, h3, h4, h5, h6, p, pre, ul, li, a, input, textarea {
    margin: 0;
    padding: 0;
    font-weight: var(--fontWeightNormal);
    color: hsl(var(--colorModeText));
    letter-spacing: 0.01rem;
  }

  /* Use a more-intuitive box-sizing model */
  *, *::after, *::before {
    box-sizing: border-box;
  }

  html {
    overflow-y: scroll; 
    /* padding-left: calc(100vw - 100%); */
  }


  /* Overide default font family */
  html, body {
    font-family: var(--fontFamily);
    font-size: 1rem;
  }

  /* Allow percentage-based heights in the application */
  html, body {
    height: 100%;
  }
  
  /*
    Typographic tweaks!
    • Add accessible line-height
    • Improve text rendering
  */
  body {
    font-size: var(--fontSize400);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    ${'' /* padding-top: calc(var(--navHeight) + 7vw); */}
    background: hsl(var(--colorMode));
    transition: background .3s ease;
  }

  /* Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* Remove built-in form & table typography styles */
  input, textarea, select, th, td {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  /* Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    line-height: 1.1;
  }

  /* Create a root stacking context */
  #root, #__next {
    isolation: isolate;
  }

  /*
    backdrop-filter: blur() doesn't work in Firefox.
    Blur everything on main tag when burger menu is toggled.
  */
  .burger-menu_background-blur {
    pointer-events: none;
    transition: filter 1s ease, opacity 1s ease;
    filter: blur(8px);
    @media ${QUERIES.largeTabletAndUp} {
      pointer-events: auto;
      filter: none;
    }
  }

`