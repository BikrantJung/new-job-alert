import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

function AniCard() {
  return (
    <Stack align="center" justify="center">
      <Box
        sx={{
          height: "200px",
          boxShadow: "md",
          width: "200px",
          border: "1px solid",
          position: "relative",
          overflow: "hidden",
          "&:hover .outer": {
            height: "600px",
            width: "600px",
          },
          "&:hover .inner": {
            height: "600px",
            width: "600px",
          },
          "&:hover .text": {
            color: "white",
          },
        }}
      >
        <Text color="black" className="text" transition="all 200ms linear">
          Hello
        </Text>
        <Box
          className="outer"
          sx={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "red",
            borderRadius: "50%",
            right: "0",
            display: "grid",
            top: 0,
            placeItems: "center",
            transform: "translate(50%,-50%)",
            transition: "all 200ms linear",
            zIndex: "-1",
          }}
        >
          <Box
            className="inner"
            sx={{
              height: "90px",
              width: "90px",
              background: "black",
              borderRadius: "50%",
              transition: "all 200ms linear",
            }}
          ></Box>
        </Box>
      </Box>
    </Stack>
  );
}

export default AniCard;
