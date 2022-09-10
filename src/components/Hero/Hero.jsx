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
import { useContext, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import Typewriter from "typewriter-effect";

import StateContext from "../../context/StateContext";
function Hero() {
  const [query, setQuery] = useState("");
  const { hasCompany } = useContext(StateContext);
  return (
    <Stack minH={"88vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={4} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"}>
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
          </Heading>
          <Text
            color={"blue.400"}
            as={"span"}
            style={{ marginTop: 0 }}
            fontSize={{ base: "lg", md: "3xl" }}
            fontWeight={"bold"}
          >
            <Typewriter
              options={{
                strings: [
                  "Search for jobs and get hired",
                  "Create company and start hiring",
                  "Post your own job vacancy",
                ],
                cursor: "_",
                loop: true,
                autoStart: true,
                deleteSpeed: 50,
                delay: 50,
              }}
            />
          </Text>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            This website is an exclusive resource for freelancers, agencies, and
            moonlighters.Unlike other job portals, we do not take any percentage
            of your earning.
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
              width={{ base: "100%", sm: "inherit" }}
            >
              Create post
            </Button>
            <Link
              as={ReactLink}
              to="/jobs"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              width={{ base: "100%", sm: "inherit" }}
            >
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                width={{ base: "100%", sm: "inherit" }}
              >
                Find Jobs
              </Button>
            </Link>
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
                placeholder={
                  hasCompany ? "Search people..." : "Search jobs...."
                }
                color={useColorModeValue("gray.600", "gray.200")}
                name="search_value"
                onChange={(e) => setQuery(e.target.value)}
              />

              <IconButton
                as={ReactLink}
                to={
                  query
                    ? hasCompany
                      ? `users/?search=${query}`
                      : `jobs/?search=${query}`
                    : ""
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
