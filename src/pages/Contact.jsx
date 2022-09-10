import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FaViber } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  MdEmail,
  MdFacebook,
  MdLocationOn,
  MdOutlineEmail,
  MdPhone,
} from "react-icons/md";
import Navbar from "../components/Navbar/Navbar";
export default function Contact() {
  return (
    <>
      <Navbar />
      <Container
        bg={useColorModeValue("#9DC4FB", "gray.800")}
        maxW="full"
        height={["auto", "90vh", "90vh"]}
        mt={0}
        centerContent
        overflow="auto"
      >
        <Flex>
          <Box
            bg={useColorModeValue("#02054B", "gray.900")}
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 14, lg: 4 }}
            p={{ sm: 5, md: 5, lg: 8 }}
          >
            <Box p={4}>
              <Stack
                direction={["column", "column", "row"]}
                spacing={{ base: 20, sm: 3, md: 5, lg: 10 }}
                alignItems="center"
                justifyContent={"center"}
              >
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Fill up the form to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          colorScheme={"twitter"}
                          leftIcon={<MdPhone color="#1970F1" size="20px" />}
                        >
                          +977-9851116608
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          colorScheme={"twitter"}
                          leftIcon={<MdEmail color="#1970F1" size="20px" />}
                        >
                          jobalertnepal2020@gmail.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          colorScheme={"twitter"}
                          leftIcon={
                            <MdLocationOn color="#1970F1" size="20px" />
                          }
                        >
                          Kathmandu, Nepal
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <IconButton
                        aria-label="facebook"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: "#0D74FF" }}
                        icon={<MdFacebook size="28px" />}
                      />
                      <IconButton
                        aria-label="github"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: "#0D74FF" }}
                        icon={<IoLogoWhatsapp size="28px" />}
                      />
                      <IconButton
                        aria-label="discord"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: "#0D74FF" }}
                        icon={<FaViber size="28px" />}
                      />
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box
                    background={useColorModeValue("white", "gray.700")}
                    borderRadius="lg"
                  >
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name" isRequired>
                          <FormLabel
                            color={useColorModeValue("gray.900", "gray.200")}
                          >
                            Your Name
                          </FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={
                                <BsPerson
                                  color={useColorModeValue("black", "white")}
                                />
                              }
                            />
                            <Input
                              color={useColorModeValue("gray.900", "gray.200")}
                              type="text"
                              size="md"
                              name="user_name"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="email">
                          <FormLabel
                            color={useColorModeValue("gray.900", "gray.200")}
                          >
                            Email
                          </FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={
                                <MdOutlineEmail
                                  color={useColorModeValue("black", "white")}
                                />
                              }
                            />
                            <Input
                              color={useColorModeValue("gray.900", "gray.200")}
                              type="email"
                              size="md"
                              name="user_email"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="message">
                          <FormLabel
                            color={useColorModeValue("gray.900", "gray.200")}
                          >
                            Message
                          </FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            placeholder="message"
                            name="user_message"
                            color={useColorModeValue("gray.900", "gray.200")}
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}
                            type="submit"
                            size="sm"
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
