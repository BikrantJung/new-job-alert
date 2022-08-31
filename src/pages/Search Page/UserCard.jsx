import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  GridItem,
  Divider,
  Tag,
  useColorMode,
  Link,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
export default function UserCard(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      maxW={"270px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Image
        h={"120px"}
        w={"full"}
        src={
          "https://images.pexels.com/photos/131683/pexels-photo-131683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        objectFit={"cover"}
      />
      <Flex justify={"center"} mt={-12}>
        <Avatar
          size={"xl"}
          src={props.avatar}
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={5}>
        <Stack spacing={0} align={"center"} mb={2}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {props.username}
          </Heading>
          <Text color={"gray.500"}>
            {props.profession ? props.profession : "No title found"}
          </Text>
        </Stack>
        <Divider
          borderBottomColor={useColorModeValue("gray.900", "gray.300")}
          borderBottomWidth={1}
        />
        <Stack direction={"row"} justify={"center"} spacing={6} mt={2}>
          <Stack spacing={0} align={"center"} gap={2}>
            <Text fontWeight={600} fontSize="xl">
              Skills
            </Text>
            {props.skills?.length ? (
              <Stack direction="row" mt={3}>
                {props.skills.map((item, i) => {
                  return <Tag key={i}>{item}</Tag>;
                })}
              </Stack>
            ) : (
              <Stack mt={3}>
                <Text color={colorMode === "light" ? "gray.900" : "gray.300"}>
                  No skills to show
                </Text>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Link
          as={ReactLink}
          to={`/profile/${props.username}`}
          _hover={{ textDecoration: "none" }}
          textDecoration="none"
        >
          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            View Profile
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
