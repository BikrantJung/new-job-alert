import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useColorMode,
  useColorModeValue,
  useDisclosure,
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
import {
  PhoneIcon,
  EmailIcon,
  InfoIcon,
  EditIcon,
  AddIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { MdWorkOutline } from "react-icons/md";
import Footer from "../../../components/Footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { Link as ReactLink, useParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { useContext } from "react";
import StateContext from "../../../context/StateContext";
import Loader from "../../../components/Loader";
import ServerErrorSVG from "../../../components/ServerErrorSVG";
import { useRef } from "react";
import AuthContext from "../../../context/AuthContext";
function CompanyDetails() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [companyData, setCompanyData] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localCover, setLocalCover] = useState("");
  const [localLogo, setLocalLogo] = useState("");
  const { colorMode } = useColorMode();
  const { userCompany } = useContext(StateContext);
  const { userID, authTokens } = useContext(AuthContext);
  useEffect(() => {
    const getCompanyDetails = async () => {
      setShowSkeleton(true);
      setShowContent(false);
      try {
        const res = await axios.get(`company/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });
        setCompanyData(res.data);
        setShowSkeleton(false);
        setShowContent(true);
        setError(false);
      } catch (error) {
        setShowContent(true);
        setError(true);
      }
    };
    getCompanyDetails();
  }, [id]);

  async function updateCompanyDetails(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    const updateData = {
      company: userID,
      companyName: data.get("company_name"),
      companyTagline: data.get("company_tagline"),
      companyEmail: data.get("company_email"),
      companyLocation: data.get("company_location"),
      companyTel: data.get("company_telephone"),
      facebook: data.get("company_facebook"),
      whatsapp: data.get("company_whatsapp"),
      instagram: data.get("company_instagram"),
      twitter: data.get("company_twitter"),
      companyDescription: data.get("company_description"),
      companyLogo: data.get("company_logo"),
      companyCover: data.get("company_cover"),
    };
    try {
      const res = await axios.put(`companySelf/${userID}`, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  function removeAllPhotos() {
    setLocalCover("");
    setLocalLogo("");
    // setLoading(true);
    onClose();
  }
  return (
    <>
      <Navbar />
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <>
          <Stack
            direction={{ base: "column", md: "row" }}
            p={5}
            gap={3}
            background={colorMode === "light" ? "gray.200" : "gray.900"}
            alignItems="flex-start"
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
                  <Image
                    // fallbackSrc="https://via.placeholder.com/150"
                    width="100%"
                    objectFit={"cover"}
                    height="100%"
                    position="absolute"
                    src={localCover || companyData?.companyCover}
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
                      src={localLogo || companyData?.companyLogo}
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
                        {companyData?.companyName}
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
                        <Icon
                          as={IoLogoWhatsapp}
                          _hover={{ cursor: "pointer" }}
                        />
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
              borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
              bgColor={colorMode === "light" ? "white" : "gray.900"}
              flex={7}
              style={{ marginInlineStart: 0 }}
            >
              <Tabs variant="enclosed" index={2} isLazy>
                <TabList>
                  <Tab gap={2}>
                    <Icon as={MdWorkOutline} />
                    <Text fontSize={[10, 11, 12, 13, 14, 15]}>Jobs</Text>
                  </Tab>
                  <Tab gap={2}>
                    <Icon as={InfoIcon} />
                    <Text fontSize={[10, 11, 12, 13, 14, 15]}>About</Text>
                  </Tab>
                  <Tab
                    gap={2}
                    style={{ marginLeft: "auto" }}
                    display={id === userCompany ? "flex" : "none"}
                  >
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
                        borderColor={
                          colorMode === "light" ? "gray.300" : "gray.600"
                        }
                        p={3}
                        color={colorMode === "light" ? "gray.700" : "gray.300"}
                      >
                        Vacancies
                      </Heading>
                      <Jobs />
                      <Jobs />
                      <Jobs />
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <About
                      companyName={companyData?.companyName}
                      companyTagline={companyData?.companyTagline}
                      companyDescription={companyData?.companyDescription}
                      companyLocation={companyData?.companyLocation}
                      companyEmail={companyData?.companyEmail}
                      companyTelephone={companyData?.companyTel}
                    />
                  </TabPanel>
                  <TabPanel
                    as="form"
                    noValidate
                    onSubmit={updateCompanyDetails}
                  >
                    <EditCompanyDetails
                      setLocalCover={setLocalCover}
                      setLocalLogo={setLocalLogo}
                      removeAllPhotos={removeAllPhotos}
                      loading={loading}
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Stack>
          <Footer />
        </>
      )}
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

function About(props) {
  return (
    <Stack
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      p={5}
    >
      <Heading fontSize="2xl">{props.companyName}</Heading>
      <Text style={{ margin: 0 }} fontWeight="bold">
        {props.companyTagline}
      </Text>
      <Text fontSize={[11, 12, 13, 14, 15, 16]}>
        {props.companyDescription}
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
            <Text>
              {props.companyLocation ? props.companyLocation : "Not available"}
            </Text>
            <Text>
              {props.companyEmail ? props.companyEmail : "Not available"}
            </Text>
            <Text>
              {props.companyTelephone
                ? props.companyTelephone
                : "Not available"}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
export function EditCompanyDetails(props) {
  const cancelRef = useRef();

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
          type="submit"
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
          <FormControl>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company name
            </FormLabel>
            <Input
              placeholder="Enter your company name..."
              name="company_name"
              fontSize={14}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Company tagline
            </FormLabel>
            <Input
              placeholder="Enter your company tagline..."
              name="company_tagline"
              fontSize={14}
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
              name="company_location"
              fontSize={14}
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
              placeholder="Describe your company..."
              fontSize={14}
              name="company_description"
            />
          </FormControl>
        </GridItem>
      </Grid>

      <Stack>
        <Stack
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          p={3}
          direction="row"
          align="center"
        >
          <Heading fontSize="lg">Social and contact info</Heading>
        </Stack>
        <Grid
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
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
                name="company_facebook"
                fontSize={14}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel style={{ margin: 0 }} fontSize={14}>
                Whatsapp number
              </FormLabel>
              <Input
                type="number"
                placeholder="Whatsapp number..."
                name="company_whatsapp"
                fontSize={14}
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
                placeholder="https://www.twitter.com/YOURACCOUNT"
                name="company_twitter"
                fontSize={14}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel style={{ margin: 0 }} fontSize={14}>
                Telephone number
              </FormLabel>
              <Input
                type="number"
                placeholder="Telephone number..."
                fontSize={14}
                name="company_telephone"
              />
            </FormControl>
          </GridItem>
        </Grid>
      </Stack>

      {/* Logo and Cover Image Update */}
      <Stack>
        <Stack
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          p={3}
          direction="row"
          align="center"
        >
          <Heading fontSize="lg">Logo and cover image</Heading>
        </Stack>
        <Stack
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          p={2}
          gap={5}
          direction="row"
        >
          <FormControl p={1} w="auto">
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Update Logo
            </FormLabel>
            <Stack my={2} direction="row">
              <Input
                type="file"
                id="logo-upload"
                accept="image/*"
                name="company_logo"
                hidden
                onChange={(e) =>
                  props.setLocalLogo(URL.createObjectURL(e.target.files[0]))
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

          <FormControl p={1} w="auto">
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Update Cover
            </FormLabel>
            <Stack my={2} direction="row">
              <Input
                type="file"
                id="cover-upload"
                accept="image/*"
                name="company_cover"
                hidden
                onChange={(e) =>
                  props.setLocalCover(URL.createObjectURL(e.target.files[0]))
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
          <FormControl p={1}>
            <FormLabel style={{ margin: 0 }} fontSize={14}>
              Reset all photos
            </FormLabel>
            <Button
              my={2}
              size="sm"
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              onClick={props.onOpen}
            >
              Reset
            </Button>
          </FormControl>
          <AlertDialog
            isOpen={props.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={props.onClose}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Reset all photos
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to reset all photos
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={props.onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      props.removeAllPhotos();
                    }}
                    ml={3}
                    leftIcon={<DeleteIcon />}
                    isLoading={props.loading}
                    disabled={props.loading}
                  >
                    Reset
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CompanyDetails;
