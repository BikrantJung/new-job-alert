import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link as ReactLink, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import AuthContext from "../context/AuthContext";
import StateContext from "../context/StateContext";
import { saveTokens } from "../services/localStorage";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthTokens } = useContext(AuthContext);
  const { justRegistered, setJustRegistered } = useContext(StateContext);
  console.log(justRegistered);
  useEffect(() => {
    justRegistered &&
      toast({
        title:
          "You've been registered. Please check your inbox for activation.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    return () => setJustRegistered(false);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const res = await axios({
        method: "POST",
        url: "login/",
        data: loginData,

        headers: {
          "Content-type": "application/json",
          Authorization: null,
        },
      });

      setIsLoading(false);
      saveTokens(res.data.token);
      setAuthTokens({
        refreshToken: res.data.token,
      });

      window.location.reload(false);
      // Navigate()
      // navigate("/");
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data?.errors?.non_field_errors) {
        toast({
          title: error?.response.data.errors.non_field_errors[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (error?.response?.data?.msg) {
        toast({
          title: "You are not verified. Please check inbox for verification",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Server error. Please try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      <Navbar />

      <Flex
        minH={"85vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} p={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign="center">
              Login to your account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to start posting job and access many more features
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} as="form" onSubmit={handleLogin}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={"column"}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"blue.400"}>Forgot password?</Link>
                  <Text>
                    Don't have an account?{" "}
                    <Link as={ReactLink} to="/signup" color="blue.400">
                      Sign up{" "}
                    </Link>
                  </Text>
                </Stack>
                <Button
                  isLoading={isLoading}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
