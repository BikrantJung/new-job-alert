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
    heading: `'SF Pro Display', sans-serif`,
    body: `'SF Pro Display', sans-serif`,
  },
  components: {
    Steps: CustomSteps,
  },
});

export default theme;
