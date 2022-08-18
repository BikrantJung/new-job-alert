import { Box, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsCodeSlash } from "react-icons/bs";
function CategoryCard() {
  return (
    <Box
      sx={{
        height: "150px",
        w: "210px",

        boxShadow: 1,
        cursor: "pointer",
      }}
    >
      <Stack
        boxShadow={"md"}
        rounded={"md"}
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",

          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "0",
            width: "40%",
            height: "2px",
            opacity: 1,
            backgroundColor: "blue.400",
            transition: " all 0.2s linear ",
          },
          "&:hover:after": {
            backgroundColor: "red.400",
            width: "210px",
          },
          svg: {
            color: "blue.400",
            transition: " color 0.2s linear ",
          },

          "&:hover svg": {
            color: "red.400",
          },
        }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Icon as={BsCodeSlash} fontSize={20} />

        <Text sx={{ fontSize: 16, fontWeight: 500, color: "text.main" }}>
          Frontend Development
        </Text>
        <Text sx={{ fontSize: 13, fontWeight: 500, color: "text.light" }}>
          10 Jobs Available
        </Text>
      </Stack>
    </Box>
  );
}

export default CategoryCard;
