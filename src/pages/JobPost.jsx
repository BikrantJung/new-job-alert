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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import StateContext from "../context/StateContext";
import { AiOutlineDollar } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import { CloseIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar/Navbar";
import { PuffLoader } from "react-spinners";
import ServerErrorSVG from "../components/ServerErrorSVG";
import Loader from "../components/Loader";
const CustomGridItem = ({ children }) => {
  return <GridItem colSpan={[2, 1]}>{children}</GridItem>;
};

export default function JobPost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [localImage, setLocalImage] = useState(null);
  const navigate = useNavigate();
  const { authTokens, initialUserData } = useContext(AuthContext);
  const { successfulPost, setSuccessfulPost } = useContext(StateContext);
  const { colorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState(0);
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
    if (selectedCategory.length) setTabIndex((prevValue) => prevValue + 1);
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

  return (
    <>
      <Navbar />
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <Box as="form" noValidate onSubmit={submitJobPost}>
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
                isDisabled={selectedCategory.length ? false : true}
                _selected={{
                  bg: colorMode === "light" ? "gray.300" : "gray.600",
                }}
              >
                Job Details
              </Tab>
              <Tab
                isDisabled={selectedCategory.length ? false : true}
                _selected={{
                  bg: colorMode === "light" ? "gray.300" : "gray.600",
                }}
              >
                Payment Details
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0} m={0}>
                <Flex
                  minH="100vh"
                  align={"flex-start"}
                  justify={"center"}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                >
                  <Stack spacing={4} mx={"auto"} maxW={"lg"} p={6}>
                    <Stack align={"center"}>
                      <Heading fontSize={"4xl"} textAlign="center">
                        Create Job Post
                      </Heading>
                    </Stack>
                    <Box
                      rounded={"lg"}
                      bg={colorMode === "light" ? "white" : "gray.700"}
                      boxShadow={"lg"}
                      p={8}
                      minH="50vh"
                    >
                      <Stack spacing={4}>
                        {categoryData.length ? (
                          <FormControl id="email" isRequired>
                            <FormLabel>Select Job Category</FormLabel>
                            <Select
                              name="job_category"
                              placeholder="Select Category"
                              onChange={(e, value) =>
                                handleCategoryChange(e, value)
                              }
                            >
                              {categoryData.map((item) => {
                                return (
                                  <option
                                    value={item.name}
                                    key={item.id}
                                    // onClick={() => console.log("CLICKEDDDD")}
                                  >
                                    {item.name}
                                  </option>
                                );
                              })}
                            </Select>
                          </FormControl>
                        ) : (
                          <Text>Categories are currently unavailable</Text>
                        )}
                      </Stack>
                    </Box>

                    <Stack justify={"end"} direction="row">
                      <Button
                        bg={colorMode === "light" ? "gray.300" : "gray.600"}
                        onClick={tabIncrement}
                        isDisabled={selectedCategory.length ? false : true}
                      >
                        Next
                      </Button>
                    </Stack>
                  </Stack>
                </Flex>
              </TabPanel>
              <TabPanel p={0} m={0}>
                <Flex
                  minH="100vh"
                  align={"flex-start"}
                  justify={"center"}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                >
                  <Stack spacing={4} mx={"auto"} maxW={"xl"} p={6}>
                    <Stack align={"center"}>
                      <Heading fontSize={"4xl"} textAlign="center">
                        Create Job Post
                      </Heading>
                    </Stack>
                    <Box
                      rounded={"lg"}
                      bg={colorMode === "light" ? "white" : "gray.700"}
                      boxShadow={"lg"}
                      p={8}
                    >
                      <Grid gap={4} templateColumns="repeat(2, 1fr)">
                        <CustomGridItem>
                          <FormControl id="title" isRequired>
                            <FormLabel>Job Title</FormLabel>
                            <Input type="text" name="job_title" />
                          </FormControl>
                        </CustomGridItem>

                        <CustomGridItem>
                          <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="job_email" />
                          </FormControl>
                        </CustomGridItem>

                        <CustomGridItem>
                          <FormControl id="location" isRequired>
                            <FormLabel>Location</FormLabel>
                            <Input type="text" name="job_location" />
                          </FormControl>
                        </CustomGridItem>

                        <CustomGridItem>
                          <FormControl id="region" isRequired>
                            <FormLabel>Region</FormLabel>
                            <Input type="text" name="job_region" />
                          </FormControl>
                        </CustomGridItem>

                        <CustomGridItem>
                          <FormControl id="email" isRequired>
                            <FormLabel>Job Type</FormLabel>
                            <Select name="job_type">
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Freelance">Freelance</option>
                            </Select>
                          </FormControl>
                        </CustomGridItem>
                        <CustomGridItem>
                          <FormControl id="email" isRequired>
                            <FormLabel>Job Experience</FormLabel>
                            <Input type="text" name="job_experience" />
                          </FormControl>
                        </CustomGridItem>
                        <GridItem colSpan={2}>
                          <FormControl id="tags" isRequired>
                            <FormLabel>Job Tags</FormLabel>

                            <Menu width="100%" placement="bottom">
                              <MenuButton
                                as={Button}
                                width="100%"
                                rightIcon={<IoChevronDown />}
                              >
                                Job Tags
                              </MenuButton>
                              <MenuList width="100%">
                                {tagsOptions ? (
                                  tagsOptions.map((item) => {
                                    return (
                                      <MenuItem
                                        key={item.id}
                                        width="100%"
                                        onClick={(e) =>
                                          handleMultiSelect(e, item.id)
                                        }
                                      >
                                        {item.value}
                                      </MenuItem>
                                    );
                                  })
                                ) : (
                                  <MenuItem disabled as={Button}>
                                    No Job Tags Found
                                  </MenuItem>
                                )}
                              </MenuList>
                            </Menu>
                          </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                          <Stack direction="row">
                            {tagValues.map((item) => {
                              return (
                                <Tag key={item.id}>
                                  <TagLabel>{item.value}</TagLabel>
                                  <TagRightIcon
                                    as={CloseIcon}
                                    fontSize={8}
                                    _hover={{ cursor: "pointer" }}
                                    onClick={() => removeTags(item.id)}
                                  />
                                </Tag>
                              );
                            })}
                          </Stack>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormControl id="description" isRequired>
                            <FormLabel>Job Description</FormLabel>
                            <Textarea type="text" name="job_description" />
                          </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                          <FormControl>
                            <Text fontSize={[14, 15, 16, 17, 18, 19]}>
                              Provide a cover image for your job post(Optional)
                            </Text>
                            <Text fontSize={[11, 12, 13, 14, 15, 16]} as="cite">
                              If not provided, default image will be used
                            </Text>
                            {localImage ? (
                              <Stack align="center" justify="center" my={3}>
                                <Image
                                  alt="Job image"
                                  objectFit="contain"
                                  width="100%"
                                  src={localImage}
                                />
                              </Stack>
                            ) : (
                              ""
                            )}
                          </FormControl>
                          <Stack my={2} direction="row">
                            <Input
                              type="file"
                              id="file-upload"
                              accept="image/*"
                              name="job_image"
                              hidden
                              onChange={(e) => handleChange(e)}
                            />

                            <Button
                              as={"label"}
                              leftIcon={<AddIcon />}
                              style={{ marginInlineStart: "0" }}
                              htmlFor="file-upload"
                              cursor={"pointer"}
                            >
                              Upload photo
                            </Button>

                            <Button
                              leftIcon={<DeleteIcon />}
                              onClick={onOpen}
                              display={localImage ? "block" : "none"}
                            >
                              Remove photo
                            </Button>
                            <AlertDialog
                              isOpen={isOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    Remove Profile Photo
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    Are you sure you want to remove profile
                                    photo
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                      Cancel
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => {
                                        removePhoto();
                                        onClose();
                                      }}
                                      ml={3}
                                      leftIcon={<DeleteIcon />}
                                    >
                                      Remove
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Box>
                    <Stack justify={"flex-end"} direction="row">
                      <Button
                        onClick={tabDecrement}
                        bg={colorMode === "light" ? "gray.300" : "gray.600"}
                      >
                        Prev
                      </Button>
                      <Button
                        bg={colorMode === "light" ? "gray.300" : "gray.600"}
                        onClick={tabIncrement}
                      >
                        Next
                      </Button>
                    </Stack>
                  </Stack>
                </Flex>
              </TabPanel>
              {/* Third */}
              <TabPanel p={0} m={0}>
                <Flex
                  minH="100vh"
                  align={"flex-start"}
                  justify={"center"}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                >
                  <Stack spacing={4} mx={"auto"} maxW={"lg"} p={6}>
                    <Stack align="center">
                      <Heading fontSize="4xl">Create Job Post</Heading>
                      <Box
                        rounded={"lg"}
                        bg={colorMode === "light" ? "white" : "gray.700"}
                        boxShadow={"lg"}
                        p={8}
                        pt={2}
                      >
                        <Grid gap={4} templateColumns="repeat(2, 1fr)">
                          <GridItem>
                            <FormControl id="salary-min" isRequired>
                              <FormLabel>Minimum Salary</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents={"none"}
                                  children={<AiOutlineDollar fontSize={20} />}
                                />
                                <Input type="number" name="min_salary" />
                              </InputGroup>
                            </FormControl>
                          </GridItem>

                          <GridItem>
                            <FormControl id="salary-max" isRequired>
                              <FormLabel>Maximum Salary</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents={"none"}
                                  children={<AiOutlineDollar fontSize={20} />}
                                />
                                <Input type="number" name="max_salary" />
                              </InputGroup>
                            </FormControl>
                          </GridItem>

                          <GridItem>
                            <FormControl id="add-information" isRequired>
                              <FormLabel>Additional Information</FormLabel>
                              <Input type="text" name="job_information" />
                            </FormControl>
                          </GridItem>
                        </Grid>
                      </Box>
                      <Stack justify={"flex-end"} direction="row" width="100%">
                        <Button
                          onClick={tabDecrement}
                          bg={colorMode === "light" ? "gray.300" : "gray.600"}
                        >
                          Prev
                        </Button>
                        <Button
                          type="submit"
                          colorScheme={"messenger"}
                          isLoading={isLoading}
                        >
                          POST
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
}
