import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  Link,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import Navbar from "../../../components/Navbar/Navbar";
import { IoLocation } from "react-icons/io5";
import { PhoneIcon, EmailIcon, InfoIcon, EditIcon } from "@chakra-ui/icons";
import { MdWorkOutline } from "react-icons/md";
import Footer from "../../../components/Footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { Link as ReactLink, useParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
function CompanyDetails() {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getCompanyDetails = async () => {
      setShowSkeleton(true);
      try {
        const res = await axios.get(`company/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });
        console.log(res);
        setCompanyData(res.data);
        setShowSkeleton(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    getCompanyDetails();
  }, [id]);

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
                // fallbackSrc="https://via.placeholder.com/150"
                width="100%"
                objectFit={"cover"}
                height="100%"
                position="absolute"
                src={companyData?.companyCover}
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
                  src={companyData?.companyLogo}
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
                {showSkeleton ? (
                  <Skeleton height="20px" width="6rem" mt={15} />
                ) : (
                  <Text
                    fontWeight={"bold"}
                    fontSize={[15, 16, 17, 18, 19, 20]}
                    mt={15}
                  >
                    {companyData?.companyUsername}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack direction="row">
              {companyData?.instagram && (
                <Tooltip
                  label={
                    companyData?.instagram
                      ? companyData?.instagram
                      : "No link found"
                  }
                  hasArrow
                  display={["none", "none", "block"]}
                >
                  <span>
                    <Link href={companyData?.instagram} target="_blank">
                      <Icon
                        as={AiFillInstagram}
                        _hover={{ cursor: "pointer" }}
                      />
                    </Link>
                  </span>
                </Tooltip>
              )}
              {companyData?.facebook && (
                <Tooltip
                  label={
                    companyData?.facebook
                      ? companyData?.facebook
                      : "No link found"
                  }
                  hasArrow
                  display={["none", "none", "block"]}
                >
                  <span>
                    <Link href={companyData?.facebook} target="_blank">
                      <Icon
                        as={AiFillFacebook}
                        _hover={{ cursor: "pointer" }}
                      />
                    </Link>
                  </span>
                </Tooltip>
              )}

              {companyData?.twitter && (
                <Tooltip
                  label={
                    companyData?.twitter
                      ? companyData?.twitter
                      : "No link found"
                  }
                  hasArrow
                  display={["none", "none", "block"]}
                >
                  <span>
                    <Link href={companyData?.twitter} target="_blank">
                      <Icon
                        as={AiFillTwitterCircle}
                        _hover={{ cursor: "pointer" }}
                      />
                    </Link>
                  </span>
                </Tooltip>
              )}

              {companyData?.whatsapp && (
                <Tooltip
                  label={
                    companyData?.whatsapp
                      ? companyData?.whatsapp
                      : "No link found"
                  }
                  hasArrow
                  display={["none", "none", "block"]}
                >
                  <span>
                    <Icon as={IoLogoWhatsapp} _hover={{ cursor: "pointer" }} />
                  </span>
                </Tooltip>
              )}
            </Stack>
            <Stack w="100%" p={3}>
              <Stack direction="row" align="center">
                <Icon as={InfoIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>
                  {companyData?.companyLocation
                    ? companyData?.companyLocation
                    : "No location found"}
                </Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={PhoneIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>
                  {companyData?.companyTel
                    ? companyData?.companyTel
                    : "No number found"}
                </Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={EmailIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>
                  {" "}
                  {companyData?.companyEmail
                    ? companyData?.companyEmail
                    : "No email found"}
                </Text>
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
              <Tab gap={2} style={{ marginLeft: "auto" }}>
                <Icon as={EditIcon} />
                <Text fontSize={[10, 11, 12, 13, 14, 15]}>Edit</Text>
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
              <TabPanel>
                <EditCompanyDetails />
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
        <Stack align="flex-start" justify="center">
          <Button colorScheme="twitter" size="sm">
            View Details
          </Button>
        </Stack>
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
export function EditCompanyDetails() {
  return (
    <Stack p={2}>
      <Stack
        border="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        p={3}
        direction="row"
        align="center"
      >
        <Heading fontSize="lg">Basic info</Heading>
        <Button
          variant="outline"
          colorScheme={"twitter"}
          style={{ marginLeft: "auto" }}
          fontWeight="inherit"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          fontWeight="inherit"
          colorScheme={"twitter"}
          onClick={() => console.log("CLICKED")}
        >
          Save
        </Button>
      </Stack>
      <Grid
        border="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        p={3}
        templateColumns="repeat(2,1fr)"
        gap={5}
      >
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company name
            </FormLabel>
            <Input placeholder="Enter your company name..." fontSize={14} />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company title
            </FormLabel>
            <Input placeholder="Enter your company title..." fontSize={14} />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company email
            </FormLabel>
            <Input
              placeholder="Enter your company email..."
              fontSize={14}
              type="email"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company location
            </FormLabel>
            <Input placeholder="Enter your company location..." fontSize={14} />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company Description
            </FormLabel>
            <Textarea
              resize="none"
              placeholder="Describe your company..."
              fontSize={14}
            />
          </FormControl>
        </GridItem>
      </Grid>
      <Stack
        border="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        p={3}
        direction="row"
        align="center"
      >
        <Heading fontSize="lg">Social and contact info</Heading>
      </Stack>
    </Stack>
  );
}

export default CompanyDetails;
