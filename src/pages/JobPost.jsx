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

//
//
//

const CustomGridItem = ({ children }) => {
  return <GridItem colSpan={[2, 1]}>{children}</GridItem>;
};

export default function JobPost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [localImage, setLocalImage] = useState(null);
  const navigate = useNavigate();
  const { authTokens, initialUserData } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState(2);
  const [tagValues, setTagValues] = useState([]);
  const [filteredJobTags, setFilteredJobTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);

  const [tagsOptions, setTagsOptions] = useState([
    {
      id: 1,
      value: "Web",
    },
    {
      id: 2,
      value: "Graphics",
    },
    {
      id: 3,
      value: "Internet",
    },
  ]);

  const handleChange = (e) => {
    setLocalImage(URL.createObjectURL(e.target.files[0]));
  };
  const removePhoto = async () => {
    setLocalImage(null);
  };

  // Job tags multi select updata array

  const handleCategoryChange = (e, value) => {
    setSelectedCategory(
      categoryData.filter((item) => {
        return item.name === e.target.value;
      })
    );
  };

  function handleMultiSelect(e, id) {
    setTagValues((prevValues) => {
      return [...prevValues, tagsOptions.find((obj) => obj.id === id)];
    });
    setTagsOptions(
      tagsOptions.filter((obj) => {
        return obj.id !== id;
      })
    );
  }

  // Remove job tags from array
  const removeTags = (id) => {
    const removedItem = tagValues.filter((obj) => {
      return obj.id === id;
    });
    setTagsOptions((prevOptions) => {
      return [...prevOptions, ...removedItem];
    });
    setTagValues(
      tagValues.filter((obj) => {
        return obj.id !== id;
      })
    );
  };

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

  // Controlled input fields

  // Get category data on first load
  useEffect(() => {
    // window.scrollTo(0, 0);
    const getCategory = async () => {
      setShowContent(false);
      try {
        const res = await axios({
          method: "GET",
          url: "category/",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        });
        setCategoryData(res.data);
        setShowContent(true);
        setError(false);
        console.log(res);
      } catch (error) {
        setShowContent(true);
        setError(true);
        console.log(error);
      }
    };

    getCategory();
  }, []);

  const submitJobPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    tagValues.map((item) => {
      filteredJobTags.push(item.value);
    });

    let postData = {
      IdComp: initialUserData?.user,

      Category: selectedCategory[0].id,
      JobTitle: data.get("job_title"),
      JobCategoryImage: selectedCategory[0].CategoryImage,
      JobImage: data.get("job_image"),
      JobEmail: data.get("job_email"),
      Location: "Nepal",
      JobRegion: data.get("job_region"),
      JobType: data.get("job_type"),
      JobCategory: data.get("job_category"),
      JobTags: JSON.stringify(filteredJobTags),
      JobDescription: data.get("job_description"),
      JobExperience: data.get("job_experience"),
      SalaryMin: data.get("min_salary"),
      SalaryMax: data.get("max_salary"),
      ImportantInformation: data.get("job_information"),
    };
    try {
      const res = await axios.post("post/", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setFilteredJobTags([]);
      setIsLoading(false);
      navigate("/jobs");
    } catch (error) {
      setFilteredJobTags([]);
      setIsLoading(false);

      if (error.response.data.JobEmail) {
        toast({
          title: error.response.data.JobEmail[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
      if (error.response.data.msg) {
        toast({
          title: error.response.data.msg,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
      console.log(error);
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
      borderRadius: "0",

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

  return (
    <>
      <Navbar />

      <Box
        as="form"
        noValidate
        onSubmit={submitJobPost}
        bg={useColorModeValue("gray.100", "gray.800")}
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
              _selected={{
                bg: colorMode === "light" ? "gray.300" : "gray.600",
              }}
            >
              Job Category
            </Tab>
            <Tab
              isDisabled={tabIndex >= 1 ? false : true}
              _selected={{
                bg: colorMode === "light" ? "gray.300" : "gray.600",
              }}
            >
              Job Details
            </Tab>
            <Tab
              isDisabled={tabIndex < 2 ? true : false}
              _selected={{
                bg: colorMode === "light" ? "gray.300" : "gray.600",
              }}
            >
              Salary & Deadline
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel display="flex" width="100%" justifyContent="center">
              <BasicDetails
                tabIncrement={tabIncrement}
                customStyles={customStyles}
              />
            </TabPanel>
            <TabPanel display="flex" width="100%" justifyContent="center">
              <EduExperience
                tabIncrement={tabIncrement}
                customStyles={customStyles}
                tabDecrement={tabDecrement}
              />
            </TabPanel>
            <TabPanel display="flex" width="100%" justifyContent="center">
              <PaymentDate
                tabIncrement={tabIncrement}
                customStyles={customStyles}
                tabDecrement={tabDecrement}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

function BasicDetails(props) {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const menuRef = useRef();
  const [inputValues, setInputValues] = useState({
    JobTitle: "",
    JobCategory: "",
    JobPosition: "",
    JobVacancies: "",
    JobType: "",
  });
  const [categoryData, setCategoryData] = useState([
    { value: "Engineer", label: "Engineer" },
    { value: "Doctor", label: "Doctor" },
    { value: "Pilot", label: "Pilot" },
    { value: "Assistant", label: "Assistant" },
    { value: "Hostess", label: "Hostess" },
    { value: "Manager", label: "Manager" },
    { value: "CEO", label: "CEO" },
    { value: "Teacher", label: "Teacher" },
    { value: "Farmer", label: "Farmer" },
    { value: "Priest", label: "Priest" },
    { value: "Judge", label: "Judge" },
    { value: "Mayor", label: "Mayor" },
    { value: "Prime Minister", label: "Prime Minister" },
    { value: "Present", label: "Present" },
    { value: "King", label: "King" },
  ]);
  const [jobTypeData, setJobTypeData] = useState([
    { value: "Full time", label: "Full time" },
    { value: "Part time", label: "Part time" },
    { value: "Freelance", label: "Freelance" },
    { value: "Work from home", label: "Work from home" },
  ]);
  const [positionData, setPositionData] = useState([
    { value: "Full time", label: "Full time" },
    { value: "Part time", label: "Part time" },
    { value: "Freelance", label: "Freelance" },
    { value: "Work from home", label: "Work from home" },
  ]);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.700")}
      w="50%"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
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
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel>Job title</FormLabel>
              <Input
                placeholder="E.x. Engineer"
                outline="1px solid "
                outlineColor={colorMode === "light" ? "gray.300" : "gray.600"}
                borderRadius="0"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired>
              <FormLabel>Position</FormLabel>
              <ReactSelect
                isClearable
                options={positionData}
                styles={props.customStyles}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired>
              <FormLabel>Job Location</FormLabel>
              <Input placeholder="E.x. Thamel, Kathmandu" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired>
              <FormLabel>Job category</FormLabel>
              <ReactSelect
                isClearable
                options={categoryData}
                styles={props.customStyles}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl ref={menuRef}>
              <FormLabel>No of vacancies</FormLabel>
              <Input defaultValue={1} type="number" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }} position="relative">
            <FormControl isRequired ref={menuRef}>
              <FormLabel>Job Type</FormLabel>
              <ReactSelect options={jobTypeData} styles={props.customStyles} />
            </FormControl>
          </GridItem>
        </Grid>
        <Stack align="flex-end">
          <Button
            size="sm"
            borderRadius="0"
            colorScheme="twitter"
            onClick={props.tabIncrement}
          >
            Proceed
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
function EduExperience(props) {
  const { colorMode } = useColorMode();
  const [educationRequired, setEducationRequired] = useState(false);
  const [educationLevel, setEducationLevel] = useState([
    { value: "Ph.D.", label: "Ph.D." },
    { value: "Masters Degree", label: "Masters Degree" },
    { value: "Bachelor", label: "Bachelor" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "SLC", label: "SLC" },
  ]);
  const [skillsRequired, setSkillsRequired] = useState([
    { value: "Web", label: "Web" },
    { value: "HTML", label: "HTML" },
    { value: "Marketing", label: "Marketing" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Business", label: "Business" },
  ]);
  return (
    <Flex
      align={"flex-start"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.700")}
      w="60%"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
    >
      <Stack spacing={4} mx={"auto"} p={6} w="100%">
        <Stack align={"center"} direction="row" w="100%">
          <Heading fontSize="lg">Specification & Education</Heading>
        </Stack>

        <Grid
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          p={2}
          templateColumns="repeat(2,1fr)"
          gap={3}
        >
          <GridItem colSpan={2} my={2}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Is education level mandatory ?
              </FormLabel>
              <Switch
                id="email-alerts"
                onChange={() => setEducationRequired(!educationRequired)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl mb={5}>
              <FormLabel>Education Level</FormLabel>
              <ReactSelect
                options={educationLevel}
                styles={props.customStyles}
                isDisabled={!educationRequired}
              />
            </FormControl>
            <Divider borderTop="1px solid gray" />
          </GridItem>
          <GridItem colSpan={2} position="relative">
            <FormControl>
              <FormLabel>Work Experience</FormLabel>
              <Input placeholder="E.x. At least 2 years at engineering" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2} position="relative">
            <FormControl>
              <FormLabel>Skills Required (No more than 5 skills)</FormLabel>
              <ReactSelect
                isClearable
                options={skillsRequired}
                isMulti
                zIndex={100}
                onChange={(e) => console.log(e)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2} position="relative" height="20rem">
            <FormControl isRequired>
              <FormLabel>Job Description</FormLabel>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                }}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Stack justify="flex-end" direction="row">
          <Button
            size="sm"
            borderRadius="0"
            colorScheme="twitter"
            onClick={props.tabDecrement}
          >
            Back
          </Button>
          <Button
            size="sm"
            borderRadius="0"
            colorScheme="twitter"
            onClick={props.tabIncrement}
          >
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
  const salaryOption = [
    { value: "Yearly", label: "Yearly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Weekly", label: "Weekly" },
    { value: "Daily", label: "Daily" },
    { value: "Hourly", label: "Hourly" },
  ];

  return (
    <Flex
      align={"flex-start"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.700")}
      w="60%"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
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
          gap={3}
        >
          <GridItem colSpan={2} my={2}>
            <FormControl display="flex" flexDirection="column" gap={3}>
              <Stack direction="row" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Select salary type:
                </FormLabel>
                <RadioGroup onChange={setValue} value={value}>
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
                    name="min_salary"
                    isDisabled={value === "Fixed" ? true : false}
                    s
                  />
                </InputGroup>
                <Box flex={1}>
                  <ReactSelect
                    styles={props.customStyles}
                    options={salaryOption}
                  />
                </Box>
              </Stack>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl mb={5}>
              <FormLabel style={{ margin: 0 }}>Application Deadline</FormLabel>
              <Text style={{ marginTop: 0 }} fontSize={13}>
                If you select any past date, your post will be automatically
                deleted
              </Text>
              <Input type="datetime-local" />
            </FormControl>
          </GridItem>
        </Grid>
        <Stack justify="flex-end" direction="row">
          <Button
            size="sm"
            borderRadius="0"
            colorScheme="twitter"
            onClick={props.tabDecrement}
          >
            Back
          </Button>
          <Button
            size="sm"
            borderRadius="0"
            colorScheme="twitter"
            onClick={props.tabIncrement}
          >
            Proceed
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

// {
//   <Flex
//     minH="100vh"
//     align={"flex-start"}
//     justify={"center"}
//     bg={colorMode === "light" ? "gray.50" : "gray.800"}
//   >
//     <Stack spacing={4} mx={"auto"} maxW={"xl"} p={6}>
//       <Stack align={"center"}>
//         <Heading fontSize={"4xl"} textAlign="center">
//           Create Job Post
//         </Heading>
//       </Stack>
//       <Box
//         rounded={"lg"}
//         bg={colorMode === "light" ? "white" : "gray.700"}
//         boxShadow={"lg"}
//         p={8}
//       >
//         <Grid gap={4} templateColumns="repeat(2, 1fr)">
//           <CustomGridItem>
//             <FormControl id="title" isRequired>
//               <FormLabel>Job Title</FormLabel>
//               <Input type="text" name="job_title" />
//             </FormControl>
//           </CustomGridItem>

//           <CustomGridItem>
//             <FormControl id="email" isRequired>
//               <FormLabel>Email</FormLabel>
//               <Input type="email" name="job_email" />
//             </FormControl>
//           </CustomGridItem>

//           <CustomGridItem>
//             <FormControl id="location" isRequired>
//               <FormLabel>Location</FormLabel>
//               <Input type="text" name="job_location" />
//             </FormControl>
//           </CustomGridItem>

//           <CustomGridItem>
//             <FormControl id="region" isRequired>
//               <FormLabel>Region</FormLabel>
//               <Input type="text" name="job_region" />
//             </FormControl>
//           </CustomGridItem>

//           <CustomGridItem>
//             <FormControl id="email" isRequired>
//               <FormLabel>Job Type</FormLabel>
//               <Select name="job_type">
//                 <option value="Full Time">Full Time</option>
//                 <option value="Part Time">Part Time</option>
//                 <option value="Freelance">Freelance</option>
//               </Select>
//             </FormControl>
//           </CustomGridItem>
//           <CustomGridItem>
//             <FormControl id="email" isRequired>
//               <FormLabel>Job Experience</FormLabel>
//               <Input type="text" name="job_experience" />
//             </FormControl>
//           </CustomGridItem>
//           <GridItem colSpan={2}>
//             <FormControl id="tags" isRequired>
//               <FormLabel>Job Tags</FormLabel>

//               <Menu width="100%" placement="bottom">
//                 <MenuButton
//                   as={Button}
//                   width="100%"
//                   rightIcon={<IoChevronDown />}
//                 >
//                   Job Tags
//                 </MenuButton>
//                 <MenuList width="100%">
//                   {tagsOptions ? (
//                     tagsOptions.map((item) => {
//                       return (
//                         <MenuItem
//                           key={item.id}
//                           width="100%"
//                           onClick={(e) => handleMultiSelect(e, item.id)}
//                         >
//                           {item.value}
//                         </MenuItem>
//                       );
//                     })
//                   ) : (
//                     <MenuItem disabled as={Button}>
//                       No Job Tags Found
//                     </MenuItem>
//                   )}
//                 </MenuList>
//               </Menu>
//             </FormControl>
//           </GridItem>

//           <GridItem colSpan={2}>
//             <Stack direction="row">
//               {tagValues.map((item) => {
//                 return (
//                   <Tag key={item.id}>
//                     <TagLabel>{item.value}</TagLabel>
//                     <TagRightIcon
//                       as={CloseIcon}
//                       fontSize={8}
//                       _hover={{ cursor: "pointer" }}
//                       onClick={() => removeTags(item.id)}
//                     />
//                   </Tag>
//                 );
//               })}
//             </Stack>
//           </GridItem>
//           <GridItem colSpan={2}>
//             <FormControl id="description" isRequired>
//               <FormLabel>Job Description</FormLabel>
//               <Textarea type="text" name="job_description" />
//             </FormControl>
//           </GridItem>

//           <GridItem colSpan={2}>
//             <FormControl>
//               <Text fontSize={[14, 15, 16, 17, 18, 19]}>
//                 Provide a cover image for your job post(Optional)
//               </Text>
//               <Text fontSize={[11, 12, 13, 14, 15, 16]} as="cite">
//                 If not provided, default image will be used
//               </Text>
//               {localImage ? (
//                 <Stack align="center" justify="center" my={3}>
//                   <Image
//                     alt="Job image"
//                     objectFit="contain"
//                     width="100%"
//                     src={localImage}
//                   />
//                 </Stack>
//               ) : (
//                 ""
//               )}
//             </FormControl>
//             <Stack my={2} direction="row">
//               <Input
//                 type="file"
//                 id="file-upload"
//                 accept="image/*"
//                 name="job_image"
//                 hidden
//                 onChange={(e) => handleChange(e)}
//               />

//               <Button
//                 as={"label"}
//                 leftIcon={<AddIcon />}
//                 style={{ marginInlineStart: "0" }}
//                 htmlFor="file-upload"
//                 cursor={"pointer"}
//               >
//                 Upload photo
//               </Button>

//               <Button
//                 leftIcon={<DeleteIcon />}
//                 onClick={onOpen}
//                 display={localImage ? "block" : "none"}
//               >
//                 Remove photo
//               </Button>
//               <AlertDialog
//                 isOpen={isOpen}
//                 leastDestructiveRef={cancelRef}
//                 onClose={onClose}
//               >
//                 <AlertDialogOverlay>
//                   <AlertDialogContent>
//                     <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                       Remove Profile Photo
//                     </AlertDialogHeader>

//                     <AlertDialogBody>
//                       Are you sure you want to remove profile photo
//                     </AlertDialogBody>

//                     <AlertDialogFooter>
//                       <Button ref={cancelRef} onClick={onClose}>
//                         Cancel
//                       </Button>
//                       <Button
//                         colorScheme="red"
//                         onClick={() => {
//                           removePhoto();
//                           onClose();
//                         }}
//                         ml={3}
//                         leftIcon={<DeleteIcon />}
//                       >
//                         Remove
//                       </Button>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialogOverlay>
//               </AlertDialog>
//             </Stack>
//           </GridItem>
//         </Grid>
//       </Box>
//       <Stack justify={"flex-end"} direction="row">
//         <Button
//           onClick={tabDecrement}
//           bg={colorMode === "light" ? "gray.300" : "gray.600"}
//         >
//           Prev
//         </Button>
//         <Button
//           bg={colorMode === "light" ? "gray.300" : "gray.600"}
//           onClick={tabIncrement}
//         >
//           Next
//         </Button>
//       </Stack>
//     </Stack>
//   </Flex>;
// }
