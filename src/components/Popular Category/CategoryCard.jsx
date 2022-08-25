import {
  Box,
  GridItem,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
function CategoryCard(props) {
  const [name, setName] = useState("");

  return (
    <LinkBox>
      <LinkOverlay as={ReactLink} to={`/jobs/${props.company}`}>
        <GridItem
          sx={{
            height: "70px",
            cursor: "pointer",
          }}
        >
          <Stack
            boxShadow={"md"}
            rounded={"md"}
            bgColor={useColorModeValue("white", "black")}
            // border="1px solid"
            // borderColor="gray.400"
            p={1}
            sx={{
              height: "100%",
              width: "100%",
              position: "relative",
              "&:hover": {
                filter: useColorModeValue("brightness(0.9)", "brightness(1.2)"),
              },
            }}
            // alignItems="center"
            // justifyContent="space-between"
            direction={"row"}
          >
            <Stack align="flex-start" justify="center">
              <Image src={props.logo} rounded="md" boxSize={["50px"]} />
            </Stack>

            <Stack justify="center">
              <Text
                fontSize={[11, 12, 13, 14, 15, 16, 17]}
                sx={{ fontWeight: "bold" }}
                color={useColorModeValue("black", "gray.300")}
              >
                {props.company}
              </Text>

              <Text
                sx={{ fontSize: 13, fontWeight: 500 }}
                style={{ marginTop: "0" }}
                color={useColorModeValue("black", "gray.300")}
              >
                {props.post}
              </Text>
            </Stack>
          </Stack>
        </GridItem>
      </LinkOverlay>
    </LinkBox>
  );
}

export default CategoryCard;
