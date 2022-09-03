import { Heading, Center } from "@chakra-ui/react";
import React from "react";

function CustomHeader({ children, ...rest }) {
  return (
    <Center >
      <Heading
        {...rest}
        sx={{
          position: "relative",
          // textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "3%",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "0",
            height: "2px",
            opacity: 1,
            backgroundColor: "green.400",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: "8%",
            left: "55%",
            transform: "translateX(-35%)",
            bottom: "0",
            height: "2px",
            opacity: 1,
            backgroundColor: "green.400",
          },
        }}
      >
        {children}
      </Heading>
    </Center>
  );
}

export default CustomHeader;
