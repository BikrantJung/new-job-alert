import { Stack } from "@chakra-ui/react";
import React from "react";
import { PuffLoader } from "react-spinners";

function Loader({ ...rest }) {
  return (
    <Stack
      align="center"
      justify="center"
      height="100vh"
      wight="100vw"
      {...rest}
    >
      <PuffLoader color="rgb(54, 215, 183)" />
    </Stack>
  );
}

export default Loader;
