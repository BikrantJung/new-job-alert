import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import Navbar from "../../../components/Navbar/Navbar";
import { IoLocation } from "react-icons/io5";
import { PhoneIcon, EmailIcon, InfoIcon, EditIcon } from "@chakra-ui/icons";
import { MdWorkOutline } from "react-icons/md";
import Footer from "../../../components/Footer/Footer";
function CompanyDetails() {
  return (
    <>
      <Navbar />
      <Stack
        direction={{ base: "column", md: "row" }}
        p={5}
        gap={3}
        background={useColorModeValue("gray.200", "gray.900")}
        alignItems="flex-start"
      >
        <Stack
          bgColor={useColorModeValue("white", "gray.800")}
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          flex={3}
          style={{ marginInlineStart: 0 }}
          alignSelf="flex-start"
          height="80vh"
          overflow="hidden"
          w="100%"
        >
          <Stack align="center" height="100%">
            <Box
              height={{ base: "13rem", md: "45rem" }}
              //   m={5}

              w="100%"
              display="grid"
              placeItems={"center"}
              position="relative"
              bgColor={useColorModeValue("gray.100", "gray.900")}
              //   display="none"
            >
              <Image
                fallbackSrc="https://via.placeholder.com/150"
                width="100%"
                objectFit={"cover"}
                height="100%"
                position="absolute"
                src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                // mt={100}
              />
              <Box
                bgColor="white"
                p={1}
                borderRadius="full"
                position="absolute"
                bottom={"-20%"}
                left={"50%"}
                transform="translateX(-50%)"
              >
                <Avatar
                  size="lg"
                  src="https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  //   objectFit={'cover'}
                />
              </Box>
            </Box>
            <Stack align="center">
              <Stack
                mt={{ base: 39, md: 34 }}
                direction="row"
                align="center"
                justify={"center"}
              >
                <Text fontWeight={"bold"} fontSize={[15, 16, 17, 18, 19, 20]}>
                  X.COM
                </Text>
              </Stack>
              <Stack direction="row">
                <Text
                  fontSize={[8, 9, 10, 11, 12, 13]}
                  color={useColorModeValue("gray.700", "gray.300")}
                >
                  E-commerce
                </Text>
                <Divider orientation="vertical" />
                <Text
                  fontSize={[8, 9, 10, 11, 12, 13]}
                  color={useColorModeValue("gray.700", "gray.300")}
                >
                  E-business
                </Text>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Icon
                as={AiFillFacebook}
                cursor="pointer"
                fontSize={{ base: 14, md: 18 }}
              />
              <Icon
                as={AiFillLinkedin}
                cursor="pointer"
                fontSize={{ base: 14, md: 18 }}
              />
            </Stack>
            <Stack w="100%" p={3}>
              <Stack direction="row" align="center">
                <Icon as={InfoIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>Birendranager</Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={PhoneIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>98480254</Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={EmailIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>email@gmail.com</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          bgColor={useColorModeValue("white", "gray.900")}
          flex={7}
          style={{ marginInlineStart: 0 }}
        >
          <Tabs variant="enclosed" isLazy>
            <TabList>
              <Tab gap={2}>
                <Icon as={MdWorkOutline} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>Jobs</Text>
              </Tab>
              <Tab gap={2}>
                <Icon as={InfoIcon} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>About</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack>
                  <Heading
                    fontSize="lg"
                    border="1px solid"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    p={3}
                    color={useColorModeValue("gray.700", "gray.300")}
                  >
                    Vacancies
                  </Heading>
                  <Jobs />
                  <Jobs />
                  <Jobs />
                </Stack>
              </TabPanel>
              <TabPanel>
                <About />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
}

function Jobs() {
  return (
    <Stack
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      p={5}
      direction="row"
      align="center"
      justify={"space-evenly"}
    >
      <Stack>
        <Heading fontSize="2xl">JOB TITLE HERE</Heading>
        <Text
          style={{ marginTop: 0 }}
          fontSize={[11, 12, 13, 14, 15, 16]}
          fontWeight="bold"
          color={useColorModeValue("gray.600", "gray.300")}
        >
          X.COM
        </Text>
        <Stack direction="row" align="center">
          <Icon as={InfoIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
          <Text fontSize={[10, 11, 12, 13, 14, 15]}>Birendranager</Text>
        </Stack>
        <Stack direction="row" align="center">
          <Icon as={PhoneIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
          <Text fontSize={[10, 11, 12, 13, 14, 15]}>98480254</Text>
        </Stack>
        <Stack direction="row" align="center">
          <Icon as={EmailIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
          <Text fontSize={[10, 11, 12, 13, 14, 15]}>email@gmail.com</Text>
        </Stack>
        <Button colorScheme="twitter" size="sm">
          Apply now
        </Button>
      </Stack>
      <Image
        // objectFit={"cover"}
        w="30%"
        src="https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
    </Stack>
  );
}

function About() {
  return (
    <Stack
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      p={5}
    >
      <Heading fontSize="2xl">X.COM</Heading>
      <Text style={{ margin: 0 }} fontWeight="bold">
        Tagline
      </Text>
      <Text fontSize={[11, 12, 13, 14, 15, 16]}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
      <Stack
        border="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        p={3}
      >
        <Heading
          fontSize="xl"
          color={useColorModeValue("gray.700", "gray.300")}
        >
          Company Details
        </Heading>

        <Stack direction="row" width="50%" marginTop={5}>
          <Stack flex={1}>
            <Stack direction="row" align="center">
              <Icon as={IoLocation} fontSize={[11, 12, 13, 14, 15, 16]} />
              <Text fontWeight={"bold"}>Location</Text>
            </Stack>
            <Stack direction="row" align="center">
              <Icon as={EmailIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
              <Text fontWeight={"bold"}>Email</Text>
            </Stack>
            <Stack direction="row" align="center">
              <Icon as={PhoneIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
              <Text fontWeight={"bold"}>Telephone</Text>
            </Stack>
          </Stack>
          <Stack flex={1}>
            <Text>Birendranagar</Text>
            <Text>Birendranagar</Text>
            <Text>Birendranagar</Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CompanyDetails;
