import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import {
  Link as ReactLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function Hero() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const { isCompany } = useContext(AuthContext);
  console.log(searchParams.get("search"));

  return (
    <Stack minH={"88vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              JOBS ALLTIME
            </Text>
            <br />
            <Text color={"blue.400"} as={"span"}>
              GRAB NOW
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            The project board is an exclusive resource for contract work. It's
            perfect for freelancers, agencies, and moonlighters.
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            align={"center"}
          >
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              width={{ base: "40%", md: "inherit" }}
            >
              Create post
            </Button>
            <Stack
              className="search-box"
              direction="row"
              overflow="hidden"
              bgColor="transparent"
              position="relative"
              padding="3px"
              width="50px"
              height="50px"
              transition={"width 300ms cubic-bezier(0.18, 0.89, 0.32, 1.15)"}
              _focusWithin={{
                width: "50%",
                ".search-input": {
                  opacity: 1,
                  outline: 0,
                  width: "calc(100% - 50px)",

                  cursor: "initial",
                },
                ".search-btn": {
                  background: "blue.400",
                  boxShadow: "none",
                  transition: "box-shadow 150ms ease-in-out",
                  "&:focus, &:hover": {
                    outline: 0,
                    boxShadow: "0 0 10px rgba(0,0,0,0.35)",
                  },
                },
              }}
            >
              <Input
                className="search-input"
                aria-label="search"
                flexGrow={1}
                opacity={0}
                height="40px"
                zIndex={2}
                borderRadius={"md"}
                position="absolute"
                width="auto"
                cursor="pointer"
                placeholder={isCompany ? "Search people..." : "Search jobs...."}
                color={useColorModeValue("gray.600", "gray.200")}
                name="search_value"
                onChange={(e) => setQuery(e.target.value)}
              />

              <IconButton
                as={ReactLink}
                to={
                  isCompany
                    ? `users/?search=${query}`
                    : `jobs/?search=${query}`
                }
                color="white"
                className="search-btn"
                width="40px"
                height="40px"
                bgColor="blue.400"
                _hover={{ bgColor: "blue.200" }}
                style={{
                  marginInlineStart: "0",
                  padding: 0,
                  margin: 0,
                  marginLeft: "auto",
                }}
                icon={<SearchIcon />}
                cursor="pointer"
                borderRadius="50%"
                transition="background 150ms ease-in-out"
                // type="submit"
                // onClick={() => setSearchParams({ search: "searchData" })}
              />
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
export default Hero;
