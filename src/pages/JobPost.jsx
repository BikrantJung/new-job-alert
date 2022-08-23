import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
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
  ButtonGroup,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagRightIcon,
  Skeleton,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import StateContext from "../context/StateContext";
import { AiOutlineDollar } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import { CloseIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar/Navbar";
import { getTokens } from "../services/localStorage";
import NewAxios from "../utils/newAxios";
const CustomGridItem = ({ children }) => {
  return <GridItem colSpan={[2, 1]}>{children}</GridItem>;
};

export default function JobPost() {
  const { accessToken, localUserID } = getTokens();
  const { colorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState(0);
  const [tagValues, setTagValues] = useState([]);
  const [filteredJobTags, setFilteredJobTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const toast = useToast();
  const api = NewAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [postError, setPostError] = useState([]);
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
    window.scrollTo(0, 0);
    const getCategory = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "category/",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCategoryData(res.data);
        console.log(res);
      } catch (error) {
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

    const postData = {
      user: localUserID,
      Category: selectedCategory[0].id,
      JobTitle: data.get("job_title"),
      JobCategoryImage: selectedCategory[0].CategoryImage,
      JobEmail: data.get("job_email"),
      Location: "Nepal",
      JobRegion: data.get("job_region"),
      JobType: data.get("job_type"),
      JobCategory: data.get("job_category"),
      JobTags: filteredJobTags,
      JobDescription: data.get("job_description"),
      JobExperience: data.get("job_experience"),
      SalaryMin: data.get("min_salary"),
      SalaryMax: data.get("max_salary"),
      ImportantInformation: data.get("job_information"),
    };
    console.log(postData.JobImage);
    try {
      const res = await api.post("post/", postData);
      setIsLoading(false);
      window.location.reload(false);
    } catch (error) {
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
      <Box as="form" noValidate onSubmit={submitJobPost}>
        <Tabs
          index={tabIndex}
          isFitted
          variant="enclosed"
          onChange={handleTabChange}
        >
          <TabList mb="1em">
            <Tab _selected={{ bg: useColorModeValue("gray.300", "gray.600") }}>
              Job Category
            </Tab>
            <Tab
              isDisabled={selectedCategory.length ? false : true}
              _selected={{ bg: useColorModeValue("gray.300", "gray.600") }}
            >
              Job Details
            </Tab>
            <Tab
              isDisabled={selectedCategory.length ? false : true}
              _selected={{ bg: useColorModeValue("gray.300", "gray.600") }}
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
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack spacing={4} mx={"auto"} maxW={"lg"} p={6}>
                  <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign="center">
                      Create Job Post
                    </Heading>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
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
                        <Skeleton height="100px" />
                      )}
                    </Stack>
                  </Box>

                  <Stack justify={"end"} direction="row">
                    <Button
                      bg={useColorModeValue("gray.300", "gray.600")}
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
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack spacing={4} mx={"auto"} maxW={"lg"} p={6}>
                  <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign="center">
                      Create Job Post
                    </Heading>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
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
                    </Grid>
                  </Box>
                  <Stack justify={"space-between"} direction="row">
                    <Button
                      onClick={tabDecrement}
                      bg={useColorModeValue("gray.300", "gray.600")}
                    >
                      Prev
                    </Button>
                    <Button
                      bg={useColorModeValue("gray.300", "gray.600")}
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
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack spacing={4} mx={"auto"} maxW={"lg"} p={6}>
                  <Stack align="center">
                    <Heading fontSize="4xl">Create Job Post</Heading>
                    <Box
                      rounded={"lg"}
                      bg={useColorModeValue("white", "gray.700")}
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
                    <Stack
                      justify={"space-between"}
                      direction="row"
                      width="100%"
                    >
                      <Button
                        onClick={tabDecrement}
                        bg={useColorModeValue("gray.300", "gray.600")}
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
    </>
  );
}
