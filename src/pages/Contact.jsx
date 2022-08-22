import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaViber } from "react-icons/fa";
export default function Contact() {
  return (
    <Container
      bg="#9DC4FB"
      maxW="full"
      height={["auto", "100vh", "100vh"]}
      mt={0}
      centerContent
      overflow="auto"
    >
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 14, lg: 4 }}
          p={{ sm: 5, md: 5, lg: 12 }}
        >
          <Box p={4}>
            <Stack
              direction={["column", "column", "row"]}
              spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}
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
                        color="#DCE2FF"
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        +977-9848000000
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        variant="ghost"
                        color="#DCE2FF"
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                      >
                        useremail@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        variant="ghost"
                        color="#DCE2FF"
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
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
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name" isRequired>
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md" name="user_name" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="email" size="md" name="user_email" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="message"
                          name="user_message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          type="submit"
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
  );
}
