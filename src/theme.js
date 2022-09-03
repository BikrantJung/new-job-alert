import { extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig } from "chakra-ui-steps";

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      icon: {
        ...StepsStyleConfig.baseStyle(props).icon,
        // your custom styles here
        strokeWidth: "1px",
      },
    };
  },
};

const theme = extendTheme({
  fonts: {
    heading: `'SF Pro Display'`,
    body: `'SF Pro Display'`,
  },
  components: {
    Steps: CustomSteps,
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
