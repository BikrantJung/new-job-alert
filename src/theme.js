import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  fonts: {
    heading: `'SF Pro Display'`,
    body: `'SF Pro Display'`,
  },
 
  breakpoints:{
    sm: '30em',
    md: '50em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
});

export default theme;
