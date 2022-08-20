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
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import AuthContext from "../context/AuthContext";
import StateContext from "../context/StateContext";
import { saveTokens } from "../services/localStorage";
export default function Login() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { tokens } = useContext(AuthContext);
  const { just_registered } = useContext(StateContext);
  const [authTokens, setAuthTokens] = tokens;
  const [justRegistered, setJustRegistered] = just_registered;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("I RAM");
    console.log(justRegistered);
    justRegistered &&
      toast({
        title:
          "You've been registered. Please check your inbox for activation.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
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
        url: "http://192.168.1.75:8000/api/user/login/",
        data: loginData,
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(res);
      setIsLoading(false);
      setAuthTokens(res.data.token);
      saveTokens(res.data.token);
      window.location.reload(false);
    } catch (error) {
      setIsLoading(false);
      // setServerError(error.response.data.errors);
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
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
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
