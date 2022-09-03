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
  Stack,
  Text,
  Textarea,
  Link,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { AddIcon, EmailIcon, InfoIcon, PhoneIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import BrokenImage from "../../../images/broken_image.png";
import StateContext from "../../../context/StateContext";
function CreateCompany() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [localAvatar, setLocalAvatar] = useState(null);
  const [localCover, setLocalCover] = useState(null);

  const { colorMode } = useColorMode();

  const { userID, authTokens } = useContext(AuthContext);
  const { hasCompany, setHasCompany, userCompany } = useContext(StateContext);
  async function createCompany(e) {
    e.preventDefault();
    setLoading(true);
    console.log("CREATED");
    const data = new FormData(e.currentTarget);
    const companyDetails = {
      company: userID,
      companyUsername: data.get("company_username"),
      companyName: data.get("company_name"),
      companyTagline: data.get("company_tagline"),
      companyEmail: data.get("company_email"),
      companyLocation: data.get("company_location"),
      companyTel: data.get("company_tel"),
      facebook: data.get("company_facebook"),
      whatsapp: data.get("company_whatsapp"),
      instagram: data.get("company_instagram"),
      twitter: data.get("company_twitter"),
      companyDescription: data.get("company_description"),
      companyLogo: data.get("company_logo"),
      companyCover: data.get("company_cover"),
    };
    console.log("PHOTO", companyDetails.companyLogo);
    try {
      const res = await axios.post(`companyCreate/`, companyDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);
      setHasCompany(true);
      navigate(`/company/${res.data.data.companyUsername}`);
      window.location.reload(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.companyUsername) {
        toast({
          title: error?.response?.data?.companyUsername[0],
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Server error. Please try again later",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }
  console.log(localAvatar);

  return (
    <>
      {hasCompany ? (
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, red.400, orange.600)"
            backgroundClip="text"
          >
            Sorry
          </Heading>

          <Text color={"gray.500"} mt={6}>
            Unable to create company
          </Text>
          <Text color={"gray.500"} mb={6}>
            Seems you've already created a company
          </Text>

          <Link
            as={ReactLink}
            to={`/company/${userCompany}`}
            _hover={{ textDecoration: "none" }}
            textDecoration="none"
          >
            <Button
              colorScheme="red"
              bgGradient="linear(to-r, red.400, red.500, red.600)"
              color="white"
              variant="solid"
            >
              Go to my company
            </Button>
          </Link>
        </Box>
      ) : (
        <Stack
          direction={{ base: "column", md: "row" }}
          p={5}
          gap={3}
          background={colorMode === "light" ? "gray.200" : "gray.900"}
          alignItems={{ base: "column", md: "flex-start" }}
          as={"form"}
          noValidate
          onSubmit={(e) => createCompany(e)}
          // justify="center"
        >
          <Stack
            bgColor={colorMode === "light" ? "white" : "gray.800"}
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
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
                bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
                //   display="none"
              >
                {localCover ? (
                  <Image
                    width="100%"
                    objectFit={"cover"}
                    height="100%"
                    position="absolute"
                    src={localCover}
                    // mt={100}
                  />
                ) : (
                  ""
                )}

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
                    src={localAvatar}
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
                  <Text
                    fontWeight={"bold"}
                    fontSize={[15, 16, 17, 18, 19, 20]}
                    mt={13}
                  >
                    Company name
                  </Text>
                </Stack>
                <Stack direction="row">
                  <Text
                    fontSize={[8, 9, 10, 11, 12, 13]}
                    color={colorMode === "light" ? "gray.700" : "gray.300"}
                  >
                    tags
                  </Text>
                  <Divider orientation="vertical" />
                  <Text
                    fontSize={[8, 9, 10, 11, 12, 13]}
                    color={colorMode === "light" ? "gray.700" : "gray.300"}
                  >
                    tags
                  </Text>
                </Stack>
              </Stack>
              <Stack w="100%" p={3}>
                <Stack direction="row" align="center">
                  <Icon as={InfoIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
                  <Text fontSize={[10, 11, 12, 13, 14, 15]}>location</Text>
                </Stack>
                <Stack direction="row" align="center">
                  <Icon as={PhoneIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
                  <Text fontSize={[10, 11, 12, 13, 14, 15]}>contact no.</Text>
                </Stack>
                <Stack direction="row" align="center">
                  <Icon as={EmailIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
                  <Text fontSize={[10, 11, 12, 13, 14, 15]}>email address</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            bgColor={colorMode === "light" ? "white" : "gray.900"}
            flex={7}
            style={{ marginInlineStart: 0 }}
          >
            {/*  Right side create company panel */}
            <Stack p={2}>
              <Stack
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                p={3}
                direction="row"
                align="center"
              >
                <Heading fontSize="lg">Basic info</Heading>
              </Stack>
              <Grid
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                p={3}
                templateColumns="repeat(2,1fr)"
                gap={5}
              >
                <GridItem colSpan={1}>
                  <FormControl isRequired>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company Username (Unique)
                    </FormLabel>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      This should not contain whitespaces
                    </FormLabel>

                    <Input
                      placeholder="Enter your company username..."
                      fontSize={14}
                      name="company_username"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company name
                    </FormLabel>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      This name will be displayed as your company name
                    </FormLabel>
                    <Input
                      placeholder="Enter your company name..."
                      fontSize={14}
                      name="company_name"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company Tagline
                    </FormLabel>
                    <Input
                      placeholder="Enter your company tagline..."
                      fontSize={14}
                      type="email"
                      name="company_tagline"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company email
                    </FormLabel>
                    <Input
                      placeholder="Enter your company email..."
                      fontSize={14}
                      type="email"
                      name="company_email"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company location
                    </FormLabel>
                    <Input
                      placeholder="Enter your company location..."
                      fontSize={14}
                      name="company_location"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company Description
                    </FormLabel>
                    <Textarea
                      resize="none"
                      placeholder="Established, motive, aim..."
                      fontSize={14}
                      name="company_description"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company Logo
                    </FormLabel>
                    <Stack my={2} direction="row">
                      <Input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        name="company_logo"
                        hidden
                        onChange={(e) =>
                          setLocalAvatar(URL.createObjectURL(e.target.files[0]))
                        }
                      />

                      <Button
                        as={"label"}
                        leftIcon={<AddIcon />}
                        style={{ marginInlineStart: "0" }}
                        htmlFor="logo-upload"
                        cursor={"pointer"}
                        size="sm"
                      >
                        Upload
                      </Button>
                    </Stack>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Company Cover Image
                    </FormLabel>
                    <Stack my={2} direction="row">
                      <Input
                        type="file"
                        id="cover-upload"
                        accept="image/*"
                        name="company_cover"
                        hidden
                        onChange={(e) =>
                          setLocalCover(URL.createObjectURL(e.target.files[0]))
                        }
                      />

                      <Button
                        as={"label"}
                        leftIcon={<AddIcon />}
                        style={{ marginInlineStart: "0" }}
                        htmlFor="cover-upload"
                        cursor={"pointer"}
                        size="sm"
                      >
                        Upload
                      </Button>
                    </Stack>
                  </FormControl>
                </GridItem>
              </Grid>
              <Stack
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                p={3}
                direction="row"
                align="center"
              >
                <Heading fontSize="lg">Social and contact info</Heading>
              </Stack>
              <Grid
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                p={3}
                templateColumns="repeat(2,1fr)"
                gap={5}
              >
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Facebook URL
                    </FormLabel>
                    <Input
                      placeholder="https://www.facebook.com/YOURACCOUNT"
                      fontSize={14}
                      name="company_facebook"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Whatsapp number
                    </FormLabel>
                    <Input
                      placeholder="Add your number here..."
                      fontSize={14}
                      type="number"
                      name="company_whatsapp"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Instagram URL
                    </FormLabel>
                    <Input
                      placeholder="https://www.instagram.com/YOURACCOUNT"
                      fontSize={14}
                      type="email"
                      name="company_instagram"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Twitter URL
                    </FormLabel>
                    <Input
                      placeholder="https://www.twitter.com/YOURACCOUNT "
                      fontSize={14}
                      name="company_twitter"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel style={{ margin: 0 }} fontSize={14}>
                      Telephone number
                    </FormLabel>
                    <Input
                      placeholder="Add a telephone number"
                      fontSize={14}
                      type="number"
                      name="company_tel"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <Stack
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                p={3}
                direction="row"
                align="center"
              >
                <Link
                  as={ReactLink}
                  to="/"
                  textDecoration={"none"}
                  _hover={{ textDecoration: "none" }}
                  style={{ marginLeft: "auto" }}
                >
                  <Button
                    variant="outline"
                    colorScheme={"twitter"}
                    fontWeight="inherit"
                    size="sm"
                  >
                    Back to home
                  </Button>
                </Link>
                <Button
                  size="sm"
                  fontWeight="inherit"
                  colorScheme={"twitter"}
                  type="submit"
                  isLoading={loading}
                  isDisabled={loading}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default CreateCompany;
