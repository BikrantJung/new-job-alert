import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Select,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Textarea,
  InputGroup,
  InputLeftElement,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagRightIcon,
  Skeleton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  useDisclosure,
  AlertDialogBody,
  Image,
  IconButton,
  Switch,
  Divider,
  RadioGroup,
  Radio,
  InputRightElement,
  Kbd,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import StateContext from "../context/StateContext";
import { AiOutlineDollar, AiOutlineDollarCircle } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import { CloseIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar/Navbar";
import ServerErrorSVG from "../components/ServerErrorSVG";
import Loader from "../components/Loader";
import { AiFillEye } from "react-icons/ai";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import ReactSelect from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomHeader from "../components/CustomHeader";
import ReactQuill from "react-quill";
import { BsFillCircleFill } from "react-icons/bs";
import "react-quill/dist/quill.snow.css";
//
//
//

export default function JobPost() {
  const navigate = useNavigate();

  const { authTokens, initialUserData } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [educationRequired, setEducationRequired] = useState(false);
  const [experienceText, setExperienceText] = useState("");
  const [experienceList, setExperienceList] = useState([]);
  const [postData, setPostData] = useState({
    jobCategoryData: [],
    jobEducationData: [],
    jobPositionData: [],
    jobSkillsData: [],
    jobTypeData: [],
    jobSalaryData: [],
  });

  // Job tags multi select updata array

  // Next button tab increment
  const tabIncrement = () => {
    setTabIndex((prevValue) => prevValue + 1);
  };
  // Prev button tab decrement
  const tabDecrement = () => {
    setTabIndex((prevValue) => prevValue - 1);
  };

  // Click on tab to change tab
  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  // Get category data on first load
  useEffect(() => {
    // window.scrollTo(0, 0);
    const getCategory = async () => {
      setShowContent(false);

      // const endpoints = ['category/','position/','type/','education/','skills/','salary/']
      const endpoints = [
        "category/",
        "educationlevel/",
        "jobposition/",
        "jobskills/",
        "jobtype/",
        "salarytype/",
      ];
      try {
        const res = await axios.all(
          endpoints.map(async (endpoint) => await axios.get(endpoint))
        );

        setPostData((prevData) => {
          return {
            ...prevData,
            ["jobCategoryData"]: res[0].data,
            ["jobEducationData"]: res[1].data,
            ["jobPositionData"]: res[2].data,
            ["jobSkillsData"]: res[3].data,
            ["jobTypeData"]: res[4].data,
            ["jobSalaryData"]: res[5].data,
          };
        });

        setShowContent(true);
        setError(false);
      } catch (error) {
        setShowContent(true);
        setError(true);
      }
    };

    getCategory();
  }, []);

  const submitJobPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    let skills = [];
    requiredSkills.map((item) => {
      skills.push(item.value);
    });

    let postData = {
      IdComp: initialUserData?.user,
      Category: data.get("job_category"),
      JobTitle: data.get("job_title"),
      JobPosition: data.get("job_position"),
      NoOfVacancy: data.get("no_of_vacancies"),
      EduRequirement: educationRequired,
      EduLevel: data.get("edu_level"),
      JobEmail: data.get("job_email"),
      Location: data.get("job_location"),
      JobRegion: data.get("job_region"),
      JobType: data.get("job_type"),
      RequiredSkills: skills,
      JobDescription: jobDescription,
      SalaryType: data.get("salary_type"),
      SalaryMin: data.get("min_salary"),
      SalaryMax: data.get("max_salary"),
      SalaryOption: data.get("salary_option"),
      JobExperience: experienceList,
      expires_in: data.get("job_deadline"),
      ImportantInformation: data.get("imp_information"),
    };

    try {
      const res = await axios.post("post/", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setIsLoading(false);
      window.location.reload(false);
    } catch (error) {
      setIsLoading(false);

      if (error.response.data) {
        toast({
          title: "Make sure you enter all valid data",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
      if (error.response.data.JobEmail) {
        toast({
          title: "Enter valid job address",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "rgb(66, 153, 225)" : "",
      padding: 5,
      // cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgb(220,220,220)",
        color: "black",
      },

      // color: "black",
    }),

    control: (styles) => ({
      ...styles,
      display: "flex",
      color: "red",

      border: `1px solid ${
        colorMode === "light" ? "rgb(203, 213, 224)" : "rgb(74, 85, 104)"
      } `,
      background:
        colorMode === "light" ? "rgb(255, 255, 255)" : "rgb(45, 55, 72)", // none of react-select's styles are passed to <Control />
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const color = colorMode === "light" ? "black" : "white";
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition, color };
    },
  };

  // Add work experience List
  function deleteItem(id) {
    const updatedItems = experienceList.filter((elem, index) => {
      return index !== id;
    });
    setExperienceList(updatedItems);
  }

  return (
    <>
      <Navbar />
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <Box
          as="form"
          noValidate
          onSubmit={submitJobPost}
          bg={colorMode === "light" ? "gray.100" : "gray.800"}
          // height="100vh"
        >
          <Tabs
            index={tabIndex}
            isFitted
            variant="enclosed"
            onChange={handleTabChange}
          >
            <TabList mb="1em">
              <Tab
                display={{ base: "none", md: "block" }}
                _selected={{
                  bg: colorMode === "light" ? "gray.300" : "gray.600",
                }}
              >
                Basic Details
              </Tab>
              <Tab
                display={{ base: "none", md: "block" }}
                isDisabled={tabIndex >= 1 ? false : true}
                _selected={{
                  bg: colorMode === "light" ? "gray.300" : "gray.600",
                }}
              >
                Specifications
              </Tab>
              <Tab
                display={{ base: "none", md: "block" }}
                isDisabled={tabIndex < 2 ? true : false}
                _selected={{
                  bg: colorMode === "light" ? "gray.300" : "gray.600",
                }}
              >
                Salary & Deadline
              </Tab>
            </TabList>
            <CustomHeader
              textAlign={"center"}
              display={{ base: "block", md: "none" }}
            >
              Create Job Post
            </CustomHeader>
            <TabPanels>
              <TabPanel
                height={{ base: "auto", md: "80vh" }}
                display="flex"
                width="100%"
                justifyContent="center"
              >
                <BasicDetails
                  tabIncrement={tabIncrement}
                  customStyles={customStyles}
                  positionData={postData.jobPositionData}
                  categoryData={postData.jobCategoryData}
                  jobType={postData.jobTypeData}
                />
              </TabPanel>
              <TabPanel display="flex" width="100%" justifyContent="center">
                <EduExperience
                  tabIncrement={tabIncrement}
                  customStyles={customStyles}
                  tabDecrement={tabDecrement}
                  jobEducation={postData.jobEducationData}
                  jobSkills={postData.jobSkillsData}
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  setRequiredSkills={setRequiredSkills}
                  educationRequired={educationRequired}
                  setEducationRequired={setEducationRequired}
                  experienceText={experienceText}
                  setExperienceText={setExperienceText}
                  experienceList={experienceList}
                  setExperienceList={setExperienceList}
                  deleteItem={deleteItem}
                />
              </TabPanel>
              <TabPanel display="flex" width="100%" justifyContent="center">
                <PaymentDate
                  tabIncrement={tabIncrement}
                  customStyles={customStyles}
                  tabDecrement={tabDecrement}
                  jobSalary={postData.jobSalaryData}
                  isLoading={isLoading}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
}

function BasicDetails(props) {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const menuRef = useRef();

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.700")}
      w={{ base: "100%", sm: "90%", md: "70%", lg: "50%" }}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      borderRadius="md"
    >
      <Stack spacing={4} mx={"auto"} p={6} w="100%">
        <Stack align={"center"} direction="row" w="100%">
          <Heading fontSize="lg">Basic Job Details</Heading>
        </Stack>

        <Grid
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          p={2}
          templateColumns="repeat(2,1fr)"
          gap={3}
          borderRadius="md"
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel>Job title</FormLabel>
              <Input
                placeholder="E.x. Engineer"
                outline="1px solid "
                outlineColor={colorMode === "light" ? "gray.300" : "gray.600"}
                name="job_title"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired>
              <FormLabel>Position</FormLabel>
              <ReactSelect
                isClearable
                name="job_position"
                options={props.positionData}
                styles={props.customStyles}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired>
              <FormLabel>Job Location</FormLabel>
              <Input placeholder="E.x. Thamel, Kathmandu" name="job_location" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired>
              <FormLabel>Job Region</FormLabel>
              <Input placeholder="E.x. Bagmati" name="job_region" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2} position="relative">
            <FormControl isRequired>
              <FormLabel>Job category</FormLabel>
              <ReactSelect
                isClearable
                options={props.categoryData}
                styles={props.customStyles}
                name="job_category"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl ref={menuRef}>
              <FormLabel>No of vacancies</FormLabel>
              <Input defaultValue={1} type="number" name="no_of_vacancies" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired ref={menuRef}>
              <FormLabel>Job Type</FormLabel>
              <ReactSelect
                isClearable
                options={props.jobType}
                styles={props.customStyles}
                name="job_type"
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Stack align="flex-end">
          <Button size="sm" colorScheme="twitter" onClick={props.tabIncrement}>
            Proceed
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
function EduExperience(props) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      align={"flex-start"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.700")}
      w={{ base: "100%", sm: "90%", md: "70%", lg: "50%" }}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      borderRadius="md"
    >
      <Stack spacing={4} mx={"auto"} p={6} w="100%">
        <Stack align={"center"} direction="row" w="100%">
          <Heading fontSize="lg">
            Specification & Education (All fields are required)
          </Heading>
        </Stack>
        <Grid
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          p={2}
          templateColumns="repeat(2,1fr)"
          gap={3}
          borderRadius="md"
        >
          <GridItem colSpan={2} my={2}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Is education level mandatory ?
              </FormLabel>
              <Switch
                id="email-alerts"
                onChange={(e) =>
                  props.setEducationRequired(!props.educationRequired)
                }
                name="edu_required"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl mb={5}>
              <FormLabel>Education Level</FormLabel>
              <ReactSelect
                isClearable
                options={props.jobEducation}
                styles={props.customStyles}
                isDisabled={!props.educationRequired}
                name="edu_level"
              />
            </FormControl>
            <Divider borderTop="1px solid gray" />
          </GridItem>
          <GridItem colSpan={2} position="relative">
            <FormControl>
              <FormLabel style={{ margin: 0 }}>Work Experience</FormLabel>
              <Text fontSize={14} style={{ marginTop: 0 }} mb={1}>
                Type a sentence and press <Kbd mx={1}>+</Kbd> icon
              </Text>
              <InputGroup flex={1}>
                <InputRightElement
                  children={<AddIcon fontSize={14} />}
                  cursor="pointer"
                  bg={colorMode === "light" ? "gray.100" : "gray.800"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.200" : "gray.900",
                  }}
                  onClick={() => {
                    if (props.experienceText) {
                      props.setExperienceList((prevValue) => {
                        return [...prevValue, props.experienceText];
                      });
                      props.setExperienceText("");
                    }
                  }}
                />
                <Input
                  value={props.experienceText}
                  onChange={(e) => props.setExperienceText(e.target.value)}
                  placeholder="E.x. At least 2 years at engineering"
                  name="job_experience"
                />
              </InputGroup>
            </FormControl>
            {props.experienceList?.length ? (
              <Stack
                direction="row"
                my={4}
                p={3}
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
              >
                <List spacing={3} w="100%">
                  {props.experienceList?.map((item, index) => {
                    return (
                      <>
                        <ListItem
                          display={"flex"}
                          alignItems="center"
                          gap={2}
                          w="100%"
                          key={index}
                        >
                          <ListIcon
                            as={BsFillCircleFill}
                            color="rgb(29, 161, 242)"
                            fontSize={13}
                          />
                          <Text fontSize={(10, 11, 12, 13, 14, 15)}>
                            {item}
                          </Text>
                          <IconButton
                            icon={<DeleteIcon />}
                            fontSize={14}
                            size="sm"
                            marginLeft={"auto"}
                            onClick={() => props.deleteItem(index)}
                          />
                        </ListItem>
                        <Divider borderTop="1px solid gray" />
                      </>
                    );
                  })}
                </List>
              </Stack>
            ) : (
              ""
            )}
          </GridItem>
          <GridItem colSpan={2} position="relative">
            <FormControl>
              <FormLabel>Skills Required (No more than 5 skills)</FormLabel>
              <ReactSelect
                isClearable
                options={props.jobSkills}
                isMulti
                zIndex={100}
                onChange={(e) => props.setRequiredSkills(e)}
                name="job_skills"
                styles={props.customStyles}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2} position="relative" height="20rem">
            <FormControl isRequired>
              <FormLabel>Job Description</FormLabel>
              <ReactQuill
                style={{ height: "30vh", color: "" }}
                theme="snow"
                value={props.jobDescription}
                onChange={props.setJobDescription}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Stack justify="flex-end" direction="row">
          <Button size="sm" colorScheme="twitter" onClick={props.tabDecrement}>
            Back
          </Button>
          <Button size="sm" colorScheme="twitter" onClick={props.tabIncrement}>
            Proceed
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

function PaymentDate(props) {
  const { colorMode } = useColorMode();
  const [value, setValue] = useState("Fixed");

  return (
    <Flex
      align={"flex-start"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.700")}
      w={{ base: "100%", sm: "90%", md: "70%", lg: "50%" }}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      borderRadius="md"
    >
      <Stack spacing={4} mx={"auto"} p={6} w="100%">
        <Stack align={"center"} direction="row" w="100%">
          <Heading fontSize="lg">Salary & Deadline</Heading>
        </Stack>

        <Grid
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          p={2}
          templateColumns="repeat(2,1fr)"
          borderRadius="md"
          gap={3}
        >
          <GridItem colSpan={2} my={2}>
            <FormControl display="flex" flexDirection="column" gap={3}>
              <Stack direction="row" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Select salary type:
                </FormLabel>

                {/* Salary type (Ranged or Fixed) */}
                <RadioGroup
                  onChange={setValue}
                  value={value}
                  name="salary_type"
                >
                  <Stack direction="row">
                    <Radio value="Fixed">Fixed</Radio>
                    <Radio value="Ranged">Ranged</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
              <Stack direction="row" w="100%">
                <InputGroup flex={1}>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<AiOutlineDollarCircle fontSize={20} />}
                  />
                  <Input type="number" name="min_salary" />
                </InputGroup>
                <InputGroup flex={1}>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<AiOutlineDollarCircle fontSize={20} />}
                  />
                  <Input
                    type="number"
                    name="max_salary"
                    isDisabled={value === "Fixed" ? true : false}
                  />
                </InputGroup>

                {/* Salary Options... */}
                <Box flex={1}>
                  <ReactSelect
                    isClearable
                    name="salary_option"
                    styles={props.customStyles}
                    options={props.jobSalary}
                  />
                </Box>
              </Stack>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl mb={5} isRequired>
              <FormLabel style={{ margin: 0 }}>Contact email</FormLabel>

              <Input
                type="email"
                placeholder="Enter your contact email"
                name="job_email"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl mb={5}>
              <FormLabel style={{ margin: 0 }}>Application Deadline</FormLabel>
              <Text style={{ marginTop: 0 }} fontSize={13}>
                If you select any past date, your post will be automatically
                deleted
              </Text>
              <Input type="datetime-local" name="job_deadline" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl mb={5}>
              <FormLabel style={{ margin: 0 }}>
                Additional Information
              </FormLabel>
              <Textarea
                resize="none"
                style={{ marginTop: 0 }}
                name="imp_information"
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Stack justify="flex-end" direction="row">
          <Button size="sm" colorScheme="twitter" onClick={props.tabDecrement}>
            Back
          </Button>
          <Button
            size="sm"
            colorScheme="twitter"
            type="submit"
            isLoading={props.isLoading}
            isDisabled={props.isLoading}
          >
            Post
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
