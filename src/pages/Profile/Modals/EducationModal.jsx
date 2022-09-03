import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function EducationModal(props) {
  const toast = useToast();
  const {
    userProfileData,
    setUserProfileData,
    userID,
    initialUserData,
    authTokens,
    moreUserData,
    setMoreUserData,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [yearArray, setYearArray] = useState([]);
  const [currentlyStudying, setCurrentlyStudying] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const educationData = {
      euser: userID,
      school: data.get("school"),
      areaOfStudy: data.get("area_of_study"),
      fromYear: data.get("year_from"),
      toYear: data.get("year_to"),
      eduDescription: data.get("description"),
      degree: data.get("degree"),
      currentEdu: currentlyStudying,
    };

    try {
      const res = await axios.put(
        `profileEduDetails/${userID}`,
        educationData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );
      setLoading(false);

      setAllowClose(true);

      setMoreUserData(res.data);
    } catch (error) {
      setAllowClose(false);
      setLoading(false);
      if (error.response?.data?.fromYear || error.response?.data?.toYear) {
        toast({
          title: "Please select the year",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (error.response?.data?.school) {
        toast({
          title: "Please enter a school name ",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (error.response?.data?.areaOfStudy) {
        toast({
          title: "Please enter the area of study",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };
  useEffect(() => {
    const handleClose = () => {
      if (allowClose) {
        setAllowClose(false);
        setLoading(false);
        props.onClose();
      }
    };
    handleClose();
  }, [allowClose]);
  useEffect(() => {
    function getFromList() {
      setYearArray([]);
      for (let index = new Date().getFullYear(); index >= 1950; index--) {
        setYearArray((prevValue) => {
          return [...prevValue, index];
        });
      }
    }
    getFromList();
  }, []);

  return (
    <Modal
      preserveScrollBarGap
      isCentered
      isOpen={props.isOpen}
      onClose={() => {
        setLoading(false);
        props.onClose();
      }}
      scrollBehavior={"outside"}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        w={["100vw", "100vw", "80vw"]}
        m={0}
        as="form"
        onSubmit={(e) => handleFormSubmit(e)}
        noValidate
        style={{ marginTop: "10rem" }}
      >
        <Stack mb={25}>
          <ModalHeader textAlign={"center"}>
            Update education details
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"} gap={4}>
            <FormControl id="school">
              <FormLabel>School/University</FormLabel>
              <Input
                type="text"
                name="school"
                placeholder="E.x. Cambridge University"
              />
            </FormControl>
            <FormControl id="area-of-study">
              <FormLabel>Area of study</FormLabel>
              <Input
                type="text"
                name="area_of_study"
                defaultValue={
                  userProfileData?.phNumber || initialUserData?.phNumber
                }
                placeholder="E.x. Computer Science"
              />
            </FormControl>
            <FormControl id="degree">
              <FormLabel>Degree</FormLabel>
              <Input
                type="text"
                name="degree"
                placeholder="E.x. Bachelor's degree"
              />
            </FormControl>
            <FormControl id="currently-studying">
              <Checkbox
                onChange={() => setCurrentlyStudying((prevValue) => !prevValue)}
              >
                Currently studying
              </Checkbox>
            </FormControl>
            <Grid templateColumns={"repeat(2,1fr)"} gap={2} w="100%">
              <GridItem colSpan={1}>
                <FormControl id="year-from" isRequired>
                  <FormLabel>Year: From</FormLabel>
                  <Select placeholder="Select year" name="year_from">
                    {yearArray.map((item, i) => {
                      return (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl id="year-to" isRequired>
                  <FormLabel>Year: To</FormLabel>
                  <Select
                    placeholder="Select year"
                    name="year_to"
                    w="100%"
                    disabled={currentlyStudying}
                  >
                    {yearArray.map((item, i) => {
                      return (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl id="description">
              <FormLabel>Education Description</FormLabel>
              <Textarea
                resize={"none"}
                type="text"
                name="description"
                defaultValue={
                  userProfileData?.phNumber || initialUserData?.phNumber
                }
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClose={() => {
              setLoading(false);
              props.onClose();
            }}
          >
            Close
          </Button>
          <Button type="submit" isLoading={loading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EducationModal;
