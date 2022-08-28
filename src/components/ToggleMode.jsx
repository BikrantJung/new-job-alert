import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
function ToggleMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={() => toggleColorMode()}>
      {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

export default ToggleMode;
