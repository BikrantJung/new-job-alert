import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

function EditPageProtect() {
  const navigate = useNavigate();
  return (
    <Stack
      flex={7}
      style={{ marginInlineStart: 0 }}
      w="100%"
      overflow="auto"
      height="100vh"
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, rgb(29, 161, 242),rgb(11, 109, 169))"
          backgroundClip="text"
        >
          Sorry
        </Heading>

        <Text color={"gray.500"} mt={6}>
          Unable to edit
        </Text>
        <Text color={"gray.500"} mb={6}>
          You cannot edit other's profile page
        </Text>

        <Button
          colorScheme="twitter"
          bgGradient="linear(to-r, rgb(29, 161, 242),rgb(11, 109, 169))"
          //   color="white"
          variant="solid"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Box>
    </Stack>
  );
}

export default EditPageProtect;
