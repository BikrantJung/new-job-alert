import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Icon,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import axios from "axios";
import StateContext from "../context/StateContext";
import { useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
  const { just_registered } = useContext(StateContext);
  const [justRegistered, setJustRegistered] = just_registered;
  const toast = useToast();
  const navigate = useNavigate();
  // Submit the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(e.currentTarget);
    const data = new FormData(e.currentTarget);
    const registerData = {
      name: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: hasAcceptedPolicy ? "True" : "False",
    };
    try {
      const res = await axios({
        method: "POST",
        url: "register/",
        data: registerData,
        headers: {
          "Content-type": "application/json",
        },
      });
      setJustRegistered(true);
      console.log(res);
      setIsLoading(false);
      navigate("/login");
      console.log("SIGNUP", justRegistered);
    } catch (error) {
      setIsLoading(false);

      if (error?.response.data.errors.non_field_errors) {
        toast({
          title: error?.response.data.errors.non_field_errors[0],
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else if (error?.response.data.errors.name) {
        toast({
          title: error?.response.data.errors.name[0],
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else if (error?.response.data.errors.email) {
        toast({
          title: error?.response.data.errors.email[0],
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("HELLO");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} p={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} as={"form"} onSubmit={handleSubmit}>
              <FormControl id="firstName" isRequired>
                <FormLabel>User Name</FormLabel>
                <Input type="text" name="userName" />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password2" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password2"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Checkbox
                onChange={() => setHasAcceptedPolicy(!hasAcceptedPolicy)}
              >
                I've read and accepted the{" "}
                <Link
                  as={ReactLink}
                  to="/terms-and-conditions"
                  color={"blue.400"}
                >
                  terms and conditions
                </Link>
              </Checkbox>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                  disabled={!hasAcceptedPolicy}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link as={ReactLink} to="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
