import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  EmailIcon,
  InfoIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
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
  LinkBox,
  LinkOverlay,
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { IoIosAttach, IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { Link as ReactLink, Outlet, useParams } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/Loader";
import Navbar from "../../../components/Navbar/Navbar";
import ServerErrorSVG from "../../../components/ServerErrorSVG";
import AuthContext from "../../../context/AuthContext";
import StateContext from "../../../context/StateContext";
import { IoMdPaper } from "react-icons/io";
function CompanyDetails() {
  const { id } = useParams();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);

  const { colorMode } = useColorMode();
  const {
    userCompany,
    companyData,
    setCompanyData,

    localCover,
    setLocalCover,
    localLogo,
    setLocalLogo,
  } = useContext(StateContext);
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
        console.log(res.data);
      } catch (error) {
        setShowContent(true);
        setError(true);
      }
    };
    getCompanyDetails();
  }, [id, setCompanyData]);

  return (
    <>
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <>
          <Navbar />
          <Stack
            direction={{ base: "column", md: "row" }}
            p={5}
            gap={3}
            background={colorMode === "light" ? "gray.200" : "gray.900"}
            alignItems={{ base: "center", md: "flex-start" }}
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
                    bottom={"-10%"}
                    left={"50%"}
                    transform="translateX(-50%)"
                  >
                    <Avatar
                      size="lg"
                      src={localLogo || companyData?.companyLogo}
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
                      <Link
                        textDecoration="none"
                        _hover={{ textDecoration: "none", color: "blue.400" }}
                        as={ReactLink}
                        to={`/company/${companyData?.companyUsername}`}
                      >
                        <Text
                          fontWeight={"bold"}
                          fontSize={[15, 16, 17, 18, 19, 20]}
                        >
                          {companyData?.companyName}
                        </Text>
                      </Link>
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

            {/* Right side company details panel */}
            <Outlet />
          </Stack>
          <Footer />
        </>
      )}
    </>
  );
}

export function CompanyDefaultContent(props) {
  const { colorMode } = useColorMode();
  const { id } = useParams();
  const toast = useToast();
  const [nextUrl, setNextUrl] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    userCompany,
    companyData,
    localCover,
    setLocalCover,
    localLogo,
    companyJobs,
    setCompanyJobs,
    setCompanyData,
    setLocalLogo,
    jobApplications,
    setJobApplications,
  } = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const { userID, authTokens } = useContext(AuthContext);

  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);

  // Get company Jobs
  useEffect(() => {
    const getCompanyJobs = async () => {
      try {
        const res = await axios.get(`companyJobs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });
        setCompanyJobs([]);
        console.log("Company jobs", res);
        if (res.data.next) {
          setNextUrl(res.data.next);
        }
        setCompanyJobs(res.data.results);
      } catch (error) {}
    };
    getCompanyJobs();
  }, [id]);

  async function updateCompanyDetails(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    let updateData = {
      company: userID,
      companyName: data.get("company_name")
        ? data.get("company_name")
        : companyData?.companyName,
      companyTagline: data.get("company_tagline"),
      companyEmail: data.get("company_email"),
      companyLocation: data.get("company_location"),
      companyTel: data.get("company_telephone"),
      facebook: data.get("company_facebook"),
      whatsapp: data.get("company_whatsapp"),
      instagram: data.get("company_instagram"),
      twitter: data.get("company_twitter"),
      companyDescription: data.get("company_description"),
    };
    if (localLogo) {
      updateData.companyLogo = data.get("company_logo");
    }
    if (localCover) {
      updateData.companyCover = data.get("company_cover");
    }
    try {
      const res = await axios.put(`companySelf/${userID}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);
      setCompanyData(res.data);
      window.location.reload(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.companyCover) {
        toast({
          title: error?.response?.data?.companyCover[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      if (error?.response?.data?.companyLogo) {
        toast({
          title: error?.response?.data?.companyLogo[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      if (error?.response?.data?.companyEmail) {
        toast({
          title: error?.response?.data?.companyEmail[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
    }
  }

  function removeAllPhotos() {
    setLocalCover("");
    setLocalLogo("");
    // setLoading(true);
    onClose();
  }

  // Get job applications data
  useEffect(() => {
    async function getJobApplications() {
      setShowContent(false);
      try {
        const res = await axios.get(`/applicant/${companyData.company}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.accessToken}`,
          },
        });
        setJobApplications(res.data);
        setShowContent(true);
        setError(false);
      } catch (error) {
        setShowContent(true);

        setError(true);
      }
    }
    getJobApplications();
  }, []);

  // Show more handler
  const showMoreHandler = async () => {
    if (nextUrl) {
      setLoading(true);
      try {
        const res = await axios({
          url: nextUrl,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });
        console.log(res);
        setCompanyJobs((prevData) => {
          return [...prevData, ...res.data.results];
        });
        setLoading(false);
        if (res.data.next) {
          setNextUrl(res.data.next);
        } else {
          setNextUrl("");
        }
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <Stack
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      bgColor={colorMode === "light" ? "white" : "gray.800"}
      flex={7}
      style={{ marginInlineStart: 0 }}
      width={{ base: "100%", md: "auto" }}
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
          <Tab gap={2} display={id === userCompany ? "flex" : "none"}>
            <Icon as={IoMdPaper} />
            <Text fontSize={[10, 11, 12, 13, 14, 15]}>Applications</Text>
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
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                p={3}
                color={colorMode === "light" ? "gray.700" : "gray.300"}
              >
                Vacancies
              </Heading>

              {companyJobs?.length ? (
                companyJobs?.map((item, index) => {
                  return (
                    <Jobs
                      key={index}
                      companyName={item?.companyUser}
                      jobTitle={item?.JobTitle}
                      companyLocation={item?.Location}
                      companyPhone={props.companyData?.companyTel}
                      jobEmail={item?.JobEmail}
                      companyLogo={props.companyData?.companyLogo}
                      jobID={item?.id}
                    />
                  );
                })
              ) : (
                <Text p={3}>This company hasn't posted yet.</Text>
              )}
              {nextUrl && (
                <Stack
                  // sx={{ my: 3 }}
                  style={{ margin: "1rem 0" }}
                  width={"100%"}
                  align="flex-end"
                >
                  <Button
                    size="sm"
                    colorScheme="twitter"
                    onClick={showMoreHandler}
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    Show more...
                  </Button>
                </Stack>
              )}
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
          <TabPanel>
            <Stack flex={7} p={2} align={{ base: "center", sm: "flex-start" }}>
              <Heading fontSize="2xl">Applications</Heading>;
            </Stack>

            {!showContent ? (
              <Loader />
            ) : error ? (
              <ServerErrorSVG />
            ) : !jobApplications?.length ? (
              <Stack align="center" justify={"center"} height="70vh">
                <Heading>No applications yet</Heading>
              </Stack>
            ) : (
              jobApplications.map((item) => {
                return (
                  <JobApplication
                    key={item.jobId}
                    {...item}
                    showContent={showContent}
                    error={error}
                    companyName={companyData.companyUsername}
                  />
                );
              })
            )}
          </TabPanel>
          <TabPanel as="form" noValidate onSubmit={updateCompanyDetails}>
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
  );
}
function JobApplication(props) {
  const {
    error,
    showContent,
    username,
    email,
    phNumber,
    description,
    jobTitle,
    file,
    userId,
    jobId,
    companyName,
  } = props;

  const { colorMode } = useColorMode();

  return (
    <>
      <Stack
        border="1px solid"
        borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
        p={3}
        direction={"column"}
      >
        <Stack
          p={3}
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          direction={{ base: "column-reverse", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          justify={{ base: "initial", md: "space-between" }}
        >
          <Stack gap={2} flex={2}>
            <Heading color="teal.400" fontSize="2xl">
              {jobTitle}
            </Heading>
            <Stack p={2}>
              <Heading fontSize="xl">Applicant Details</Heading>
              <Stack direction="row" w="100%">
                <Stack flex={1}>
                  <Text fontWeight={"bold"}>Username</Text>

                  <Text fontWeight={"bold"}>Email</Text>

                  <Text fontWeight={"bold"}>Phone number</Text>
                </Stack>
                <Stack flex={1}>
                  <Text>{username ? username : "Not available"}</Text>
                  <Text>{email ? email : "Not available"}</Text>
                  <Text>{phNumber ? username : "Not available"}</Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack p={2}>
              <Heading fontSize="lg">Letter Description</Heading>

              <Text style={{ margin: 0 }} fontSize={18} textAlign="justify">
                {description ? description : "Not available"}
              </Text>
            </Stack>

            {/* Applied file */}
            <Stack p={2}>
              <Heading fontSize="lg">Uploaded file</Heading>

              <LinkBox
                as={Stack}
                sx={{ my: 6 }}
                direction="row"
                align="center"
                gap={3}
                p={2}
                borderRadius="md"
                boxShadow={"md"}
              >
                <Icon as={IoIosAttach} fontSize={18} color="teal.400" />
                <LinkOverlay href={file} target={"_blank"}>
                  <Text fontSize={18} color="teal.400">
                    {file.split("/").slice(-1)[0]}
                  </Text>
                </LinkOverlay>
              </LinkBox>
            </Stack>
            <Stack p={3} direction="row" align="center" justify={"flex-end"}>
              <Link
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                as={ReactLink}
                to={`/company/${companyName}/${jobTitle}/${jobId}`}
              >
                <Button
                  size="md"
                  fontWeight="inherit"
                  colorScheme={"twitter"}
                  type="submit"
                >
                  View job post
                </Button>
              </Link>
              <Link
                as={ReactLink}
                to={`/profile/${username}`}
                color="inherit"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  size="md"
                  fontWeight="inherit"
                  colorScheme={"twitter"}
                  type="submit"
                >
                  View profile
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Stack align="center" justify={"center"} flex={1}>
            <Avatar size="xl" />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

function Jobs(props) {
  const { colorMode } = useColorMode();
  const [moreShown, setMoreShown] = useState(false);
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Stack
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      p={3}
      direction={{ base: "column-reverse", sm: "row" }}
      align={{ base: "center", sm: "flex-start" }}
      justify={"space-evenly"}
    >
      <Stack flex={7} p={2} align={{ base: "center", sm: "flex-start" }}>
        <Heading fontSize="2xl">{props.jobTitle}</Heading>
        <Text
          style={{ marginTop: 0 }}
          fontSize={[11, 12, 13, 14, 15, 16]}
          fontWeight="bold"
          color={useColorModeValue("gray.600", "gray.300")}
        >
          {props.companyName}
        </Text>
        <Stack direction="row" align="center">
          <Icon as={InfoIcon} fontSize={[11, 12, 13, 14, 15, 16]} />
          <Text fontSize={[10, 11, 12, 13, 14, 15]}>
            {props.companyLocation}
          </Text>
        </Stack>
        {props.companyPhone ? (
          <Stack direction="row" align="center">
            <Icon as={PhoneIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
            <Text fontSize={[10, 11, 12, 13, 14, 15]}>
              {props.companyPhone}
            </Text>
          </Stack>
        ) : (
          ""
        )}

        <Stack direction="row" align="center">
          <Icon as={EmailIcon} fontSize={[10, 11, 12, 13, 14, 15]} />
          <Text fontSize={[10, 11, 12, 13, 14, 15]}>{props.jobEmail}</Text>
        </Stack>

        {/* More job Details */}

        <Stack align="flex-start" justify="center">
          <Link
            as={ReactLink}
            to={`${props.jobTitle}/${props.jobID}`}
            _hover={{ textDecoration: "none" }}
            textDecoration="none"
          >
            <Button
              colorScheme="twitter"
              size={{ base: "xs", sm: "sm" }}
              onClick={() => setMoreShown(!moreShown)}
            >
              View {moreShown ? "Less" : "Details"}
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Stack flex={2} align="center" justify="center" h={"100%"} w="100%">
        <Box
          height="20vh"
          width="20vh"
          overflow={"hidden"}
          backgroundImage={`url('${props.companyLogo}')`}
          backgroundPosition="center center"
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          borderRadius="md"
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
        >
          {/* <Image w="100%" src={props.companyLogo} /> */}
        </Box>
      </Stack>
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
        <Stack
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          p={3}
          direction="row"
          align="center"
        >
          <Heading fontSize="lg">Save Changes</Heading>
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
            type="submit"
            isLoading={props.loading}
            isDisabled={props.loading}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CompanyDetails;
